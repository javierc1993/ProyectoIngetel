const { excelDateToJSDate } = require('../lib/utils')

class FilterProductionEntity {
  constructor (data) {
    this.reference = {
      data: data.PO || null,
      type: 'string',
      operator: data.operadorPO || null,
      fieldName: 'reference',
    };
    this.valuePayOrder = {
      data: data.valorPO || null,
      type: 'string',
      operator: data.operadorValorPO || null,
      fieldName: 'value',
    };
    this.scenery = {
      data: data.escenario || null,
      type: 'string',
      operator: data.operadorEscenario || null,
      fieldName: 'scenery',
    };
    this.band = {
      data: data.banda || null,
      type: 'string',
      operator: data.operadorBanda || null,
      fieldName: 'band',
    };
    //fields related
    this.site = {
      data: data.SMP || null,
      type: 'string',
      operator: data.operadorSitio || null,
      fieldName: 'smp',
    };
    this.onAir = {
      data: data.onAir || null,
      type: 'string',
      operator: data.operadorOnAir || null,
    };
    this.instalation = {
      init: data.fechaDesdeInstalacion ? excelDateToJSDate(data.fechaDesdeInstalacion + ' 00:00:00') : null,
      until: data.fechaHastaInstalacion ? excelDateToJSDate(data.fechaHastaInstalacion + ' 00:00:00') : null,
      fieldName: 'date',
      type: 'date'
    };
    this.integration = {
      init: data.fechaDesdeIntegracion ? excelDateToJSDate(data.fechaDesdeIntegracion + ' 00:00:00') : null,
      until: data.fechaHastaIntegracion ? excelDateToJSDate(data.fechaHastaIntegracion + ' 00:00:00') : null,
      fieldName: 'date',
      type: 'date'
    };
    this.mosHw = {
      init: data.fechaDesdeMosHw ? excelDateToJSDate(data.fechaDesdeMosHw + ' 00:00:00') : null,
      until: data.fechaHastaMosHw ? excelDateToJSDate(data.fechaHastaMosHw + ' 00:00:00') : null,
      fieldName: 'date',
      type: 'date'
    };
    this.leader = {
      data: data.lider || null,
      type: 'string',
      operator: data.operadorLider || null,
      fieldName: 'name',
    };
    this.release = {
      data: data.porcentajeLiberacion || null,
      operator: data.operadorLiberacion || null,
      fieldName: 'sgrNumber',
      type: 'string'
    };
    this.invoice = {
      data: data.factura || null,
      operator: data.operadorFactura || null,
      fieldName: 'invoice',
      type: 'string'
    }

  }
}



module.exports = { FilterProductionEntity };
