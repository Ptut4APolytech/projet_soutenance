const db = require("../models");

const studentService = require("../services/student.service");
const slotService = require("../services/slot.service");
const jurorService = require("../services/juror.service");
const juryService = require("../services/jury.service");
const roomService = require("../services/room.service");

const serieService = require("../services/serie.service");

const defenseModel = require("../Models/defense.model");

exports.build = async (id) => {
    let serie = await serieService.getOne(id);
    let students = serie.students;
    let jurors = serie.jurors;
    let rooms = serie.rooms;
    let slots = serie.slots;
    let juries = await juryService.getAll(id);

    return await orderJury(juries, students);

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

exports.checkJurorSlot = (idJuror, idSlot) => {
  return true;
  /* return true si juré disponnible sur ce créenau horaire, false sinon */
}

exports.dispoJury = (idJury) => {
  return [];
  /* le tableau de la liste des slots disponnibles entre les trois jurés du juré */
  /* erreur si tableau vide (plus tard) */
}

exports.checkSlots = () => {
  return true;
  /* return true si le nombre de salles x le nombre de slots >= nopbre d'étudiants, false sinon */
  /* erreur si false (plus tard) */
}

async function orderJury(juries, students) {
  let coeff_juries = [];

  // get values
  juries.forEach(jury => {
    // gets the number of stutents this MAP has
    let nb_stu_map = students.filter(student =>  student.masterId === jury.masterId).length;
    coeff_juries.push({
      idJury: jury.id,
      nb_stu_map: nb_stu_map,
      coeff_map_1 : 0,
      coeff_map_2 : 0,
      coeff_map_3 : 0,
      coeff_map_scale_1 : 0,
      //coeff_map_scale_2 : 0,
    })
  });

  // calulates the sum total of the nb_stu_map values
  let sum_nb_stu_map = coeff_juries.reduce((previousValue, currentItem ) => previousValue + currentItem.nb_stu_map, 0);
  // calculates the average of the nb_stu_map values
  let avg_nb_stu_map = sum_nb_stu_map / coeff_juries.length;
  /*
  // calculates min and max of the nb_stu_map values
  let min_nb_stu_map = coeff_juries.reduce((previousValue, currentItem ) => Math.min(previousValue, currentItem.nb_stu_map), Infinity);
  let max_nb_stu_map = coeff_juries.reduce((previousValue, currentItem ) => Math.max(previousValue, currentItem.nb_stu_map), -Infinity);
  */

  console.log(sum_nb_stu_map);
  console.log(avg_nb_stu_map);

  // TODO: no need of all these calculation : just move nb_stu_map to [0-1] scale

  // calculates coeffs
  coeff_juries.forEach(jury => {
    jury.coeff_map_1 = Math.abs(jury.nb_stu_map - avg_nb_stu_map);
    jury.coeff_map_2 = jury.nb_stu_map / avg_nb_stu_map;
    jury.coeff_map_3 = jury.nb_stu_map / sum_nb_stu_map;
  });

  // calculates min and max of the coeff_map_1 values
  let min_coeff_map_1 = coeff_juries.reduce((previousValue, currentItem ) => Math.min(previousValue, currentItem.coeff_map_1), Infinity);
  let max_coeff_map_1 = coeff_juries.reduce((previousValue, currentItem ) => Math.max(previousValue, currentItem.coeff_map_1), -Infinity);

  // move scale to [0-1]
  // src : https://karbotronics.com/blog/2020-02-28-formule-changement-echelle-min-et-max/
  var changeScale = (value) => ((1 - 0) / (max_coeff_map_1 - min_coeff_map_1)) * (value - min_coeff_map_1) + 0;
  coeff_juries.forEach(jury => {
    jury.coeff_map_scale_1 = changeScale(jury.coeff_map_1);
  });

  /*
  // calculates min and max of the coeff_map_1 values
  let min_coeff_map_2 = coeff_juries.reduce((previousValue, currentItem ) => Math.min(previousValue, currentItem.coeff_map_2), Infinity);
  let max_coeff_map_2 = coeff_juries.reduce((previousValue, currentItem ) => Math.max(previousValue, currentItem.coeff_map_2), -Infinity);

  // move scale to [0-1]
  var changeScale = (value) => ((1 - 0) / (max_coeff_map_2 - min_coeff_map_2)) * (value - min_coeff_map_2) + 0;
  coeff_juries.forEach(jury => {
    jury.coeff_map_scale_2 = changeScale(jury.coeff_map_2);
  });
  */


  // order by coeff
  console.table(coeff_juries);

  return juries;
  /* retourne un tableau de liste d'id des jury triés (jury avec les MAP qui s'occupent de beaucoup d'étudiant en premier...)*/
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