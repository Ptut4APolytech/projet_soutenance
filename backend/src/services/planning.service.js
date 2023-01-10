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
    
    return checkError(students, juries, slots, rooms);
    
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


/**
 * find general errors, which can prevent the calculation of the schedule.
 * @param {array[Jury]} juries the list of juries to check
 * @param {array[students]} students the list of student 
 * @param {array[slots]} slots the list of slots in the series 
 * @param {array[rooms]} rooms the list of rooms for the series
 * @param {array[Jury]} juries the list of juries to check
 * 
 * @returns a table with all the errors, if it is empty, the schedule calculation can be done
 */
async function checkError(students, juries, slots, rooms){
  /* return array with all erreur */
  juries.forEach(async jury => {
    let reponse = await checkSlotAvailabilityJury(jury, slots, students);
    if (reponse.length != 0){
      return reponse;
    }
  });

  reponse = checkSlotRoom(students.length, slots.length, rooms.length);
  if (reponse.length != 0){
    return reponse;
  }

  return [];
}


/**
 * control the availability of jurie according to their number of students
 * 
 * @returns error 
 */

async function  checkSlotAvailabilityJury(Jurie, slots, students){
  
  //find the number of possible slots
  let slotAvailability = await slotAvailabilityJury(Jurie, slots);
  let nbSlotAvailability = slotAvailability.length;
  if (nbSlotAvailability == 0){
    return ["Erreur : Aucun créneau horaire disponible pour le jurie n°"+ Jurie.id +" : \n" + Jurie.master.firstName + " "+ Jurie.master.lastName + "\n" + Jurie.teacher1.firstName + " "+ Jurie.teacher1.lastName + "\n"+ Jurie.teacher2.firstName + " "+ Jurie.teacher2.lastName + "\n"];
  }

  // find number of student in the master 
  let nbStudentOfMaster = 0;
  for(let student of students){
    if(student.masterId == Jurie.master.id){
      nbStudentOfMaster++;
    }
  }
  if(nbSlotAvailability < nbStudentOfMaster){
    return ["Erreur : Nombre de créneau horaire disponible inférieur au nombre d'étudiant du MAP pour le jurie n°"+ Jurie.id +" : \n" + Jurie.master.firstName + " "+ Jurie.master.lastName + "\n" + Jurie.teacher1.firstName + " "+ Jurie.teacher1.lastName + "\n"+ Jurie.teacher2.firstName + " "+ Jurie.teacher2.lastName + "\n"];
  }
  return [];
}

/**
 * Controls the number of possible places compared to the number of students
 * 
 * @returns error 
 */
function checkSlotRoom(StudentsLength, SlotLength, roomsLength) {
  if (StudentsLength > SlotLength * roomsLength){
    return ["Erreur : Nombre d'étudiant supérieur au nombre de salle * nombre de créneau horaire"];
  }
  return [];
}