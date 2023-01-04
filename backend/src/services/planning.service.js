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

    return checkJurorSlot(1, 1);
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

async function getJurorSlot   (idJuror, idSlot) {
  /* return true si juré disponnible sur ce créenau horaire, false sinon */

  let constraintsJurorSlot = await constraintsService.checkJurorSlot(idJuror, idSlot);
  if (constraintsJurorSlot.length != 1) { // si on as plusieur contrainte sur un juré pour un slot, on devrais déclancher une erreur
    console.log("Erreur sur la recherche de constraint d'un Juror, idJuror : "+ idJuror +", idSlot : " + idSlot +"    Nombre de contrainte trouvée : " + constraintsJurorSlot.length);
    return false;
  }
  return constraintsJurorSlot[0].available;
}

exports.availableJury = (idJury) => {
  return [];
  /* le tableau de la liste des slots disponnibles entre les trois jurés du juré */
  /* erreur si tableau vide (plus tard) */
}

exports.checkSlots = () => {
  return true;
  /* return true si le nombre de salles x le nombre de slots >= nopbre d'étudiants, false sinon */
  /* erreur si false (plus tard) */
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