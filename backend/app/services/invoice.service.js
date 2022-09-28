'use strict';
const { InvoiceDocEntity } = require('../entities/invoiceDoc.entity');
// const PayOrderRepository = require('../repositories/payOrder.repository');
// const { hashText } = require('../lib/crypto');


class InvoiceService {
  async createInvoice (invoices) {
    return Promise.all(invoices.filter(inv => inv['PO'] && inv['SUBTOTAL']).map(async invoice => {
      const invoiceDoc = new InvoiceDocEntity(invoice);
      const poUpdated = await PayOrderRepository.updateValuePayOrder(invoiceDoc.purchaseDocNumber, invoiceDoc.netPrice);
      return { ...invoice, updatedValue: poUpdated };
    }));
  }

}




module.exports = new InvoiceService();