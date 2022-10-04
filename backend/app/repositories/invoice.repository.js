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
  async getAllInvoice (include, where = null) {
    try {
      const resp = await Invoice.findAll({
        where: where,
        include: include
      });
      return resp
    } catch (error) {
      return false;
    }
  }

  async getInvoiceByNumber (numberInvoice) {
    try {
      const invoice = await Invoice.findOne({
        where: {
          invoice: numberInvoice
        }
      });
      return invoice;
    } catch (error) {
      console.log(error)
      return null;
    }
  }
}

module.exports = new InvoiceRepository();