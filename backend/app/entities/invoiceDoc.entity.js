

class InvoiceDocEntity {
  constructor (data) {
    this.client = data['CLIENTE'] || null;
    this.date = data['FECHA'] || null;
    this.invoiceNumber = data['No FACTURA'] || null;
    this.proyect = data['PROYECTO'] || null;
    this.month = data['MES'] || null;
    this.subTotal = data['SUBTOTAL'] || null;
    this.iva = data['IVA'] || null;
    this.total = data['TOTAL FACTURA'] || null;
    this.rtf = data['RTF'] || null;
    this.rtIva = data['RTIVA'] || null;
    this.toPay = data['A PAGAR'] || null;
    this.totalPaid = data['TOTAL PAGADO'] || null;
    this.po = data['PO'] || null;
    this.wp = data['WP'] || null;
    this.datePay = data['FECHA PAGO'] || null;
    this.nameSite = data['SITIO'] || null;
    this.proyectRelated = data['PROYECTO2'] || null;
    this.percentInvoice = data['% FACT'] || null;
    this.observation = data['OBSERVACION'] || null;
    this.state = data['ESTADO'] || null;
  }
}

module.exports = { InvoiceDocEntity };
