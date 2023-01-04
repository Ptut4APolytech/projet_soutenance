const db = require("../models");

const studentService = require("../services/student.service");
const slotService = require("../services/slot.service");
const jurorService = require("../services/juror.service");
//const juriesService = require("../services/juries.service");
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

exports.orderJury = () => {
  return [];
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