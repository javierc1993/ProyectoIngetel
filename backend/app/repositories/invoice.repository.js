'use strict';
const { Invoice } = require('../models');

class InvoiceRepository {


  async createInvoice (invoice, payOrder = null) {
    try {
      const resp = await Invoice.create(invoice);
      if (payOrder) {
        await this.setPoToInvoice(payOrder.id, resp);
      }
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async setPoToInvoice (idPo, invoice) {
    try {
      await invoice.setPayOrder(idPo);
      return true
    } catch (error) {
      return false;
    }
  }
}

module.exports = new InvoiceRepository();