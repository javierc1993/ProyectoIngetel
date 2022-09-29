'use strict';
const { InvoiceDocEntity } = require('../entities/invoiceDoc.entity');
const InvoiceRepository = require('../repositories/invoice.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
// const { hashText } = require('../lib/crypto');


class InvoiceService {
  async createInvoice (invoices) {
    return Promise.all(invoices.filter(inv => inv['PO'] && inv['SUBTOTAL']).map(async invoice => {
      const invoiceDoc = new InvoiceDocEntity(invoice);
      const payOrder = await PayOrderRepository.getPoByReference(invoiceDoc.po);
      const newInvoice = await InvoiceRepository.createInvoice(invoiceDoc, payOrder);
      if (newInvoice) {
        return { ...newInvoice, stateInvoice: 'new' };
      }
      return { ...invoiceDoc, stateInvoice: 'omited' };

    }));
  }

}




module.exports = new InvoiceService();