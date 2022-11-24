'use strict';
const { Invoice } = require('../models');
const { ForbiddenError } = require('../entities/error-entity');

class InvoiceRepository {

  async deleteInvoiceById (invoiceId) {
    try {
      const deleteId = await Invoice.destroy({
        // truncate: true,
        where: {
          id: invoiceId
        }
      })
      return true;

    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async createInvoice (invoice, payOrder = null) {
    try {
      let resp = await this.getInvoiceByNumber(invoice.invoice);
      if (!resp) {
        if (payOrder) invoice.payOrderId = payOrder.id;
        return Invoice.create(invoice);
      }
      if (payOrder) {
        await this.setPoToInvoice(payOrder.id, resp);
      }
      resp.set(invoice);
      return resp.save();
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
  async getInvoiceById (id) {
    try {
      const invoice = await Invoice.findOne({
        where: {
          id: id
        }
      });
      return invoice;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async deleteInvoice (invoice) {
    try {
      const deleteId = await Invoice.destroy({
        // truncate: true,
        where: {
          id: invoice.id
        }
      })
      return true;

    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = new InvoiceRepository();