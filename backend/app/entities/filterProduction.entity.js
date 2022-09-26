

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
      init: data.fechaDesdeInstalacion ? new Date(data.fechaDesdeInstalacion + ' 00:00:00') : null,
      until: data.fechaHastaInstalacion ? new Date(data.fechaHastaInstalacion + ' 00:00:00') : null,
      fieldName: 'date',
      type: 'date'
    };
    this.integration = {
      init: data.fechaDesdeIntegracion? new Date(data.fechaDesdeIntegracion + ' 00:00:00') : null,
      until: data.fechaHastaIntegracion? new Date(data.fechaHastaIntegracion + ' 00:00:00') : null,
      fieldName: 'date',
      type: 'date'
    };
    this.mosHw = {
      init: data.fechaDesdeMosHw? new Date(data.fechaDesdeMosHw + ' 00:00:00') : null,
      until: data.fechaHastaMosHw? new Date(data.fechaHastaMosHw + ' 00:00:00') : null,
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
      fieldName: 'name',
      type: 'number'
    }

  }
}

module.exports = { FilterProductionEntity };
