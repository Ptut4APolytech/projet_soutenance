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

    // slotAvailabilityJury(juries[0], 1);

    // return juries[0];
    return slotAvailabilityJury(juries[0], 1);;
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

async function slotAvailabilityJury (Jury ,idSerie)  {
  // créer le tableau de la liste des slots disponnibles
  slotsValide = await slotService.getserieId(idSerie);
  // recupérer les constraint de chaque juré
  let name = ['master','teacher1','teacher2'];
  for (const postJuror of name) {
    let contraints = Jury[postJuror]['constraints'];
    // supprimer les slots indisponnibles
    for (let constraint of contraints) {
      slotsValide = slotsValide.filter(slot => !(slot["id"] == constraint["slotId"] && constraint["available"] == false));
    }
  }
  
  return slotsValide;
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