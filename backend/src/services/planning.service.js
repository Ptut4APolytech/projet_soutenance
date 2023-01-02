const db = require("../models");

const studentService = require("../services/student.service");
const slotService = require("../services/slot.service");
const jurorService = require("../services/juror.service");
//const juriesService = require("../services/juries.service");
const roomService = require("../services/room.service");

const serieService = require("../services/serie.service");

const defenseModel = require("../Models/defense.model");

exports.build = async (id) => {
    let serie = await serieService.getOne(id);
    let students = serie.students;
    let jurors = serie.jurors;
    let rooms = serie.rooms;
    let slots = serie.slots;

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