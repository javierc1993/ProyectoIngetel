'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('releaseTypes', [
      { name: 'CW Process', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'CW_Process', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Extra works', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'IMP_ADJ', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'IMP_Principal_Process', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'IMP_Process', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'IMP_Process_Other', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'IMP_Process_RUR', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Implementation_Process', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Implementation_Process_2600', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Implementation_Process_RUR', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Material SV SS E2E Process', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Sellable additional works', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Site Process - CW', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Site Process - IMP', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Site Process - No Back to Back', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Site Process - TSS', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'Site Process - TSS Report', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'TSS_Site Process', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { name: 'IMP_Process_2600', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
    ], {});
    await queryInterface.bulkInsert('percentsFields', [
      { fieldDateName: 'executeCw', fieldPpaName: 'executeCwPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'finalDocument', fieldPpaName: 'finalDocumentPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'Servicio Ejecutado', fieldPpaName: 'Servicio Ejecutado PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'siteFolderApproved', fieldPpaName: 'siteFolderApprovedPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'onAirCompleted', fieldPpaName: 'onAirCompletedPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'instalation', fieldPpaName: 'instalationPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'integrationDocument', fieldPpaName: 'integrationDocumentPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'rfeNotified', fieldPpaName: 'rfeNotifiedPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'tssrClient', fieldPpaName: 'tssrClientPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'tssrApproved', fieldPpaName: 'tssrApprovedPpa', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },


    ], {});
    await queryInterface.bulkInsert('percents', [
      { percent: '60', releaseTypeId: '1', percentFieldId: '1', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '40', releaseTypeId: '1', percentFieldId: '2', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '60', releaseTypeId: '2', percentFieldId: '1', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '40', releaseTypeId: '2', percentFieldId: '2', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '100', releaseTypeId: '3', percentFieldId: '3', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '100', releaseTypeId: '4', percentFieldId: '3', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '5', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '5', percentFieldId: '5', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '6', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '30', releaseTypeId: '6', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '20', releaseTypeId: '6', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '7', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '30', releaseTypeId: '7', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '20', releaseTypeId: '7', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '8', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '30', releaseTypeId: '8', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '20', releaseTypeId: '8', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '9', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '30', releaseTypeId: '9', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '20', releaseTypeId: '9', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '10', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '30', releaseTypeId: '10', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '20', releaseTypeId: '10', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '11', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '30', releaseTypeId: '11', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '20', releaseTypeId: '11', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '100', releaseTypeId: '12', percentFieldId: '3', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '100', releaseTypeId: '13', percentFieldId: '3', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '60', releaseTypeId: '14', percentFieldId: '1', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '40', releaseTypeId: '14', percentFieldId: '2', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '25', releaseTypeId: '15', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '25', releaseTypeId: '15', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '15', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '100', releaseTypeId: '16', percentFieldId: '3', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '100', releaseTypeId: '17', percentFieldId: '8', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '18', percentFieldId: '9', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '18', percentFieldId: '8', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '19', percentFieldId: '9', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '19', percentFieldId: '10', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '50', releaseTypeId: '20', percentFieldId: '6', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '30', releaseTypeId: '20', percentFieldId: '7', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { percent: '20', releaseTypeId: '20', percentFieldId: '4', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },

    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
