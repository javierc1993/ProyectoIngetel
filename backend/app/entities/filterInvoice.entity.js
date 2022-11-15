const { ddmmaaaaTommddaaaa } = require('../lib/date')

class FilterInvoiceEntity {
  constructor (data) {
    this.client = {
      data: data.cliente || null,
      type: 'string',
      operator: data.operadorCliente || null,
      fieldName: 'client',
    };
    this.payOrder = {
      data: data.PO || null,
      type: 'string',
      operator: data.operadorPO || null,
      fieldName: 'reference',
    };
    this.date = {
      init: data.fechaDesdeFecha ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeFecha) + ' 00:00:00') : null,
      until: data.fechaHastaFecha ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaFecha) + ' 00:00:00') : null,
      fieldName: 'date',
      type: 'date',
    };
    this.invoice = {
      data: data.factura || null,
      type: 'string',
      operator: data.operadorFactura || null,
      fieldName: 'invoice',
    };
    this.subtotal = {
      data: data.subtotal || null,
      type: 'number',
      operator: data.operadorSubtotal || null,
      fieldName: 'subtotal',
    };
    this.iva = {
      data: data.iva || null,
      type: 'number',
      operator: data.operadorIva || null,
      fieldName: 'iva',
    };
    this.total = {
      data: data.total || null,
      type: 'number',
      operator: data.operadorTotal || null,
      fieldName: 'total',
    };
    this.rtf = {
      data: data.rtf || null,
      operator: data.operatorRtf,
      fieldName: 'rtf',
      type: 'number'
    };
    this.rtfIva = {
      data: data.rtf || null,
      operator: data.operatorRtfIva || null,
      fieldName: 'rtfIva',
      type: 'number'
    };
    this.toPaid = {
      data: data.aPagar || null,
      operator: data.operatorAPagar || null,
      fieldName: 'toPaid',
      type: 'number'
    };
    this.totalPaid = {
      data: data.aPagar || null,
      operator: data.operatorAPagar || null,
      type: 'string',
      fieldName: 'totalPaid',
    };
    this.datePay = {
      init: data.fechaPagoDesde ? new Date(ddmmaaaaTommddaaaa(data.fechaPagoDesde) + ' 00:00:00') : null,
      until: data.fechaPagoDesde ? new Date(ddmmaaaaTommddaaaa(data.fechaPagoDesde) + ' 00:00:00') : null,
      fieldName: 'datePay',
      type: 'date'
    };
    this.release = {
      data: data.liberacion || null,
      operator: data.operadorLiberacion || null,
      fieldName: 'release',
      type: 'string'
    };
    this.percentInvoice = {
      data: data.porcentajeLiberacion || null,
      operator: data.operadorLiberacion || null,
      fieldName: 'percentInvoice',
      type: 'number'
    };
    this.observation = {
      data: data.observacion || null,
      operator: data.operadorObservacion || null,
      fieldName: 'observation',
      type: 'number'
    };
    this.state = {
      data: data.estado || null,
      operator: data.operadorEstado || null,
      fieldName: 'state',
      type: 'string'
    };

  }
}



module.exports = { FilterInvoiceEntity };
