const { excelDateToJSDate } = require('../lib/utils')

class InvoiceDocEntity {
  constructor (data) {
    this.client = data['client'] || null;
    this.date = data['fecha'] ? excelDateToJSDate(data['fecha']) : null;
    this.invoice = data['nofactura'] || null;
    this.proyect = data['proyecto'] || null;
    this.month = data['mes'] || null;
    this.subTotal = data['subtotal'] || null;
    this.iva = data['iva'] || null;
    this.total = data['totalfactura'] || null;
    this.rtf = data['rtf'] || null;
    this.rtIva = data['rtiva'] || null;
    this.toPay = data['apagar'] || null;
    this.totalPaid = data['totalpagado'] || null;
    this.po = data['po'] || null;
    this.wp = data['wp'] || null;
    this.datePay = data['fechapago'] ? excelDateToJSDate(data['fechapago']) : null;
    this.nameSite = data['sitio'] || null;
    this.proyectRelated = data['proyecto2'] || null;
    this.percentInvoice = data['fact'] || null;
    this.observation = data['observacion'] || null;
    this.state = data['estado'] || null;
  }
}

module.exports = { InvoiceDocEntity };
