const { ddmmaaaaTommddaaaa } = require('../lib/date')

class FilterInvoiceEntity {
  constructor (data) {
    this.documentNumber = {
      data: data.numeroDocumento || null,
      type: 'number',
      operator: data.operadorNumeroDocumento || null,
      fieldName: 'documentNumber',
    };
    this.amountUtilized = {
      data: data.cantidadUtilizada || null,
      type: 'number',
      operator: data.operadorCantidadUtilizada || null,
      fieldName: 'amountUtilized',
    };
    this.financialCost = {
      data: data.costoFinanciero || null,
      type: 'number',
      operator: data.operadorCostoFinanciero || null,
      fieldName: 'financialCost',
    };
    this.totalPaid = {
      data: data.totalPagado || null,
      type: 'number',
      operator: data.operadorTotalPagado || null,
      fieldName: 'totalPaid',
    };
    this.maturityDate = {
      init: data.vencimientoFechaInicio ? new Date(ddmmaaaaTommddaaaa(data.vencimientoFechaInicio) + ' 00:00:00+00:00') : null,
      until: data.vencimientoFechaFinal ? new Date(ddmmaaaaTommddaaaa(data.vencimientoFechaFinal) + ' 00:00:00+00:00') : null,
      fieldName: 'maturityDate',
      type: 'date',
    };
    this.publishDate = {
      init: data.publicacionFechaInicio ? new Date(ddmmaaaaTommddaaaa(data.publicacionFechaInicio) + ' 00:00:00+00:00') : null,
      until: data.publicacionFechaFin ? new Date(ddmmaaaaTommddaaaa(data.publicacionFechaFin) + ' 00:00:00+00:00') : null,
      fieldName: 'publishDate',
      type: 'date',
    };
    this.datePay = {
      init: data.actualizacionFechaInicio ? new Date(ddmmaaaaTommddaaaa(data.actualizacionFechaInicio) + ' 00:00:00+00:00') : null,
      until: data.actualizacionFechaFin ? new Date(ddmmaaaaTommddaaaa(data.actualizacionFechaFin) + ' 00:00:00+00:00') : null,
      fieldName: 'datePay',
      type: 'date',
    };
    this.state = {
      data: data.estado || null,
      operator: data.operadorEstado || null,
      fieldName: 'state',
      type: 'string'
    };
    this.discountTime = {
      data: data.tiempoDesconect || null,
      operator: data.operadorTiempoDesconect || null,
      fieldName: 'discountTime',
      type: 'string'
    };

  }
}



module.exports = { FilterInvoiceEntity };
