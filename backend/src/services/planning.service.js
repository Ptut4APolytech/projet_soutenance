const db = require("../models");

const studentService = require("../services/student.service");
const slotService = require("../services/slot.service");
const jurorService = require("../services/juror.service");
const juryService = require("../services/jury.service");
const roomService = require("../services/room.service");
const constraintsService = require("../services/constraint.service");

const serieService = require("../services/serie.service");

const defenseModel = require("../Models/defense.model");

exports.build = async (id) => {
    let serie = await serieService.getOne(id);
    let students = serie.students;
    let jurors = serie.jurors;
    let rooms = serie.rooms;
    let slots = serie.slots;
    let juries = await juryService.getAll(id);

    return checkError(students, slots, rooms, juries);
    return students;
  };


exports.checkJury = () => { 
  return [];
  // FORMAT TABLEAU RETOURNÉ
  /*
  [
    {
      idJury : 01,
      errorCode: 301, => créer son propre code erreur
    },
    {
      idJury : 01,
      errorCode: 302,
    }
  ]
  */
}

async function getJurorSlot(idJuror, idSlot){
  /* return true si juré disponnible sur ce créenau horaire, false sinon */

  let constraintsJurorSlot = await constraintsService.checkJurorSlot(idJuror, idSlot);
  if (constraintsJurorSlot.length != 1) { // si on as plusieur contrainte sur un juré pour un slot, on devrais déclancher une erreur
    console.log("Erreur : sur la recherche de constraint d'un Juror, idJuror : "+ idJuror +", idSlot : " + idSlot +"    Nombre de contrainte trouvée : " + constraintsJurorSlot.length);
    return false;
  }
  return constraintsJurorSlot[0].available;
}




async function slotAvailabilityJury(Jury ,slotsValide) {
  // Get the constraints of each juror
  let posts  = ['master','teacher1','teacher2'];
  for (const jurorPost  of posts ) {
    let contraints = Jury[jurorPost ]['constraints'];
    // remove unavailable slots
    for (let constraint of contraints) {
      slotsValide = slotsValide.filter(slot => !(slot["id"] == constraint["slotId"] && constraint["available"] == false));
    }
  }
  
  return slotsValide;
  /* the table of the list of available slots between the three jurors of the juror */
}



/**
 * Sorts the juries by putting the ones whose MAP have the most students and the ones with the least availability first.
 * 
 * @param {array[Jury]} juries the juries to sort
 * @param {array[Student]} students the students to count how many the MAPs are in charge of
 * @param {array[Slot]} slots ths slots to check the availablity of the juries
 * @returns {array[int]} the sorted array of juries ids
 */
function orderJury(juries, students, slots) {
  let coeff_juries = [];

  // get values
  juries.forEach(jury => {
    // gets the number of stutents this MAP has
    let nb_stu_map = students.filter(student =>  student.masterId === jury.masterId).length;
    // gets the number of slots available for this jury
    let nb_dispo_jury = slotAvailabilityJury(jury.id, slots).length;
    coeff_juries.push({
      idJury: jury.id,
      nb_stu_map: nb_stu_map,
      nb_dispo_jury: nb_dispo_jury,
      coeff_map: 0,
      coeff_dispo_jury: 0,
      coeff: 0,
    })
  });

  // functions to get min and max from values
  var getMin = (tab, index) => tab.reduce((previousValue, currentItem ) => Math.min(previousValue, currentItem[index]), Infinity);
  var getMax = (tab, index) => tab.reduce((previousValue, currentItem ) => Math.max(previousValue, currentItem[index]), -Infinity);

  // calculates min and max of the nb_stu_map values
  let min_nb_stu_map = getMin(coeff_juries, "nb_stu_map");
  let max_nb_stu_map = getMax(coeff_juries, "nb_stu_map");

  // calculates min and mox of the nb_dispo_jury values
  let min_nb_dispo_jury = getMin(coeff_juries, "nb_dispo_jury");
  let max_nb_dispo_jury = getMax(coeff_juries, "nb_dispo_jury");

  // move scale to [0-1]
  // src : https://karbotronics.com/blog/2020-02-28-formule-changement-echelle-min-et-max/
  var changeScale = (value, min, max) => ((1 - 0) / (max - min)) * (value - min) + 0;

  // calculates coeffs
  coeff_juries.forEach(jury => {
    jury.coeff_map = changeScale(jury.nb_stu_map, min_nb_stu_map, max_nb_stu_map);
    jury.coeff_dispo_jury = 1 - changeScale(jury.nb_dispo_jury, min_nb_dispo_jury, max_nb_dispo_jury);
    jury.coeff = (jury.coeff_map + jury.coeff_dispo_jury) / 2;
  });

  // order by coeff
  coeff_juries.sort((a, b) => {
    return  b.coeff - a.coeff;
  });

  // array with only the juries ids (without values & coeffs calculations)
  let juries_ids = coeff_juries.map((item) => item.idJury);

  return juries_ids;
}

exports.checkPlanning = () => {
  return [];
  // FORMAT TABLEAU RETOURNÉ (à mieux refléchir les codes d'erreurs)
  /*
  [
    {
      errorCode: 301, => créer son propre code erreur
    }
  ]
  */
}

/*
  FONCTION PLACER LES JURY DANS LES SALLES
*/

/********************* JURY FUNCTIONS **************************/

function checkError(students, slots, rooms, juries){
  /* return string si aucune erreur, false sinon */

  let juriesComplete = checkJuriesComplete(juries);
  if (juriesComplete.length != 0){
    return juriesComplete;
  }

  return checkSlotRoom(students.length, slots.length, rooms.length);
  return true;
}


function checkSlotRoom(StudentsLength, SlotLength, roomsLength) {
  if (StudentsLength > SlotLength * roomsLength){
    console.log("Erreur : Nombre d'étudiant supérieur au nombre de salle * nombre de créneau horaire");
    return false;
  }
  return true;
  /* return true si le nombre de salles x le nombre de slots >= nopbre d'étudiants, false sinon */
  /* erreur si false (plus tard) */
}

/**
 * Checks if all juries respect the conditions, meaning they all have 3 jurors and at least one juror is info related.
 * @param {array[Jury]} juries the list of juries to check
 * @returns an empty array if all the juries complete the conditions, an array with error message if some juries do not.
 */
function checkJuriesComplete(juries){
  let err = []
  juries.forEach(jury => {
    let r = checkJuryComplete(jury)
    if (r !== null)
    {
      err.push(r);
    }
  });
  return err;
}

/**
 * Checks if this jury respects the conditions, meaning it has all 3 jurors and at least one juror is info related.
 * @param {Jury} jury the jury to check
 * @returns null if this jury completes the conditions, a string with the error message otherwise
 */
function checkJuryComplete(jury){
  if (jury.master != null && jury.teacher1 != null && jury.teacher2 != null){
    if(jury.teacher1.infoRelated || jury.teacher2.infoRelated){
      return null;
    }
    return "Aucun des jurés " + jury.teacher1.firstName + " " + jury.teacher1.lastName + " et " 
                              + jury.teacher2.firstName + " " + jury.teacher2.lastName +
                                " du jury n°" + jury.id + " ne sont des professeurs d'informatique."
  }
  return "Il manque des jurés pour le jury n°"+ jury.id;
}