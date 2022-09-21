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
    ], {});
    await queryInterface.bulkInsert('percentsFields', [
      { fieldDateName: 'Execute CW+Reg Fotografico Date', fieldPpaName: 'Execute CW+Reg Fotografico PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'Documento Final Ok Date', fieldPpaName: 'Doc Final ok PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'Servicio Ejecutado', fieldPpaName: 'Servicio Ejecutado PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'Site Folder Approved by Cust. Date', fieldPpaName: 'Site Folder Approved by Cust. PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'OnAir Complete', fieldPpaName: 'OnAir Completed. PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'Installation Doc. Ok Date', fieldPpaName: 'Doc. Installation PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'Integration Doc. Ok Date', fieldPpaName: 'Doc. Integration PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'RFE Notified by Partner Date', fieldPpaName: 'RFE Notified by Partner PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'TSSR Enviado al Cliente', fieldPpaName: 'TSSR Enviado al Cliente PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },
      { fieldDateName: 'IS5.1 TSSR Approved', fieldPpaName: 'IS5.1 TSSR Approved PPA Date', createdAt: '2022-09-17 08:13:40', updatedAt: '2022-09-17 08:13:40' },


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
