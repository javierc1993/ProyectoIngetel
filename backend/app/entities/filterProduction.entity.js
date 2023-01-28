const { ddmmaaaaTommddaaaa } = require('../lib/date')

class FilterProductionEntity {
  constructor (data) {
    this.instalation = [
      {
        init: data.fechaDesdeInstalacion ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeInstalacion) + ' 00:00:00') : null,
        until: data.fechaHastaInstalacion ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaInstalacion) + ' 00:00:00') : null,
        fieldName: 'date',
        type: 'date'
      }
    ];
    this.integration = [
      {
        init: data.fechaDesdeIntegracion ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeIntegracion) + ' 00:00:00') : null,
        until: data.fechaHastaIntegracion ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaIntegracion) + ' 00:00:00') : null,
        fieldName: 'date',
        type: 'date'
      }
    ];
    this.mosHw = [
      {
        init: data.fechaDesdeMosHw ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeMosHw) + ' 00:00:00') : null,
        until: data.fechaHastaMosHw ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaMosHw) + ' 00:00:00') : null,
        fieldName: 'date',
        type: 'date'
      }
    ];
    this.onAir = [
      {
        data: data.onAir || null,
        type: 'string',
        operator: data.operadorOnAir || null,
      }
    ];
    this.site = [
      {
        data: data.SMP || null,
        type: 'string',
        operator: data.operadorSitio || null,
        fieldName: 'smp',
      },
      {
        data: data.principalSmp || null,
        operator: data.operadorPrincipalSmp || null,
        fieldName: 'mainSmp',
        type: 'string'
      }
    ];
    this.leader = [
      {
        data: data.lider || null,
        type: 'string',
        operator: data.operadorLider || null,
        fieldName: 'name',
      }
    ];
    this.release = [
      {
        data: data.numeroSgr || null,
        operator: data.operadorNumeroSgr || null,
        fieldName: 'sgrNumber',
        type: 'string'
      },
      {
        data: data.porcentajeLiberacion || null,
        operator: data.operadorPorcentajeLiberacion || null,
        fieldName: 'totalPercent',
        type: 'number'
      }
    ];
    this.invoice = [
      {
        data: data.factura || null,
        operator: data.operadorFactura || null,
        fieldName: 'invoice',
        type: 'string'
      }
    ];
    this.payOrder = [
      {
        data: data.PO || null,
        type: 'string',
        operator: data.operadorPO || null,
        fieldName: 'reference',
      },
      {
        data: data.valorPO || null,
        type: 'number',
        operator: data.operadorValorPO || null,
        fieldName: 'value',
      },
      {
        data: data.escenario || null,
        type: 'string',
        operator: data.operadorEscenario || null,
        fieldName: 'scenery',
      },
      {
        data: data.banda || null,
        type: 'string',
        operator: data.operadorBanda || null,
        fieldName: 'band',
      },
      {
        init: data.fechaDesdePoDate ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdePoDate) + ' 00:00:00') : null,
        until: data.fechaHastaPoDate ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaPoDate) + ' 00:00:00') : null,
        fieldName: 'poDate',
        type: 'date'
      }

    ]



    // this.reference = {
    //   data: data.PO || null,
    //   type: 'string',
    //   operator: data.operadorPO || null,
    //   fieldName: 'reference',
    // };
    // this.valuePayOrder = {
    //   data: data.valorPO || null,
    //   type: 'number',
    //   operator: data.operadorValorPO || null,
    //   fieldName: 'value',
    // };
    // this.scenery = {
    //   data: data.escenario || null,
    //   type: 'string',
    //   operator: data.operadorEscenario || null,
    //   fieldName: 'scenery',
    // };
    // this.band = {
    //   data: data.banda || null,
    //   type: 'string',
    //   operator: data.operadorBanda || null,
    //   fieldName: 'band',
    // };
    // this.poDate = {
    //   init: data.fechaDesdePoDate ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdePoDate) + ' 00:00:00') : null,
    //   until: data.fechaHastaPoDate ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaPoDate) + ' 00:00:00') : null,
    //   fieldName: 'poDate',
    //   type: 'date'
    // };
    // //fields related
    // this.site = {
    //   data: data.SMP || null,
    //   type: 'string',
    //   operator: data.operadorSitio || null,
    //   fieldName: 'smp',
    // };
    // this.onAir = {
    //   data: data.onAir || null,
    //   type: 'string',
    //   operator: data.operadorOnAir || null,
    // };
    // this.instalation = {
    //   init: data.fechaDesdeInstalacion ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeInstalacion) + ' 00:00:00') : null,
    //   until: data.fechaHastaInstalacion ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaInstalacion) + ' 00:00:00') : null,
    //   fieldName: 'date',
    //   type: 'date'
    // };
    // this.integration = {
    //   init: data.fechaDesdeIntegracion ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeIntegracion) + ' 00:00:00') : null,
    //   until: data.fechaHastaIntegracion ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaIntegracion) + ' 00:00:00') : null,
    //   fieldName: 'date',
    //   type: 'date'
    // };
    // this.mosHw = {
    //   init: data.fechaDesdeMosHw ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeMosHw) + ' 00:00:00') : null,
    //   until: data.fechaHastaMosHw ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaMosHw) + ' 00:00:00') : null,
    //   fieldName: 'date',
    //   type: 'date'
    // };
    // this.leader = {
    //   data: data.lider || null,
    //   type: 'string',
    //   operator: data.operadorLider || null,
    //   fieldName: 'name',
    // };
    // this.release = {
    //   data: data.porcentajeLiberacion || null,
    //   operator: data.operadorLiberacion || null,
    //   fieldName: 'sgrNumber',
    //   type: 'string'
    // };
    // this.invoice = {
    //   data: data.factura || null,
    //   operator: data.operadorFactura || null,
    //   fieldName: 'invoice',
    //   type: 'string'
    // };
    // this.mainSmp = {
    //   data: data.principalSmp || null,
    //   operator: data.operadorPrincipalSmp || null,
    //   fieldName: 'mainSmp',
    //   type: 'string'
    // }

  }
}



module.exports = { FilterProductionEntity };
