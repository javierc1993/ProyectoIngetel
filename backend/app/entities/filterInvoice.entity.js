const { ddmmaaaaTommddaaaa } = require('../lib/date')

class FilterInvoiceEntity {
  constructor (data) {
    this.invoice = [
      {
        data: data.cliente || null,
        type: 'string',
        operator: data.operadorCliente || null,
        fieldName: 'client',
      },
      {
        init: data.fechaDesdeFactura ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdeFactura) + ' 00:00:00') : null,
        until: data.fechaHastaFactura ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaFactura) + ' 00:00:00') : null,
        fieldName: 'date',
        type: 'date',
      },
      {
        data: data.factura || null,
        type: 'string',
        operator: data.operadorFactura || null,
        fieldName: 'invoice',
      },
      {
        data: data.subtotal || null,
        type: 'number',
        operator: data.operadorSubtotal || null,
        fieldName: 'subtotal',
      },
      {
        data: data.iva || null,
        type: 'number',
        operator: data.operadorIva || null,
        fieldName: 'iva',
      },
      {
        data: data.total || null,
        type: 'number',
        operator: data.operadorTotal || null,
        fieldName: 'total',
      },
      {
        data: data.rtf || null,
        operator: data.operatorRtf,
        fieldName: 'rtf',
        type: 'number'
      },
      {
        data: data.rtf || null,
        operator: data.operatorRtfIva || null,
        fieldName: 'rtfIva',
        type: 'number'
      },
      {
        data: data.aPagar || null,
        operator: data.operatorAPagar || null,
        fieldName: 'toPaid',
        type: 'number'
      },
      {
        data: data.aPagar || null,
        operator: data.operatorAPagar || null,
        type: 'string',
        fieldName: 'totalPaid',
      },
      {
        init: data.fechaDesdePago ? new Date(ddmmaaaaTommddaaaa(data.fechaDesdePago) + ' 00:00:00') : null,
        until: data.fechaHastaPago ? new Date(ddmmaaaaTommddaaaa(data.fechaHastaPago) + ' 00:00:00') : null,
        fieldName: 'datePay',
        type: 'date'
      },
      {
        data: data.liberacion || null,
        operator: data.operadorLiberacion || null,
        fieldName: 'release',
        type: 'string'
      },
      {
        data: data.porcentajeLiberacion || null,
        operator: data.operadorLiberacion || null,
        fieldName: 'percentInvoice',
        type: 'number'
      },
      {
        data: data.observacion || null,
        operator: data.operadorObservacion || null,
        fieldName: 'observation',
        type: 'number'
      }
    ];
    this.payOrder = [
      {
        data: data.PO || null,
        type: 'string',
        operator: data.operadorPO || null,
        fieldName: 'reference',
      }
    ];

    this.pay = [
      {
        data: data.estado || null,
        operator: data.operadorEstado || null,
        fieldName: 'state',
        type: 'string'
      }
    ]


  }
}



module.exports = { FilterInvoiceEntity };
