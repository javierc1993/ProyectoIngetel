'use strict';
const { Pay, Invoice } = require('../models');

class PayRepository {


  async createPay (pay, invoice = null) {
    try {
      let resp = await this.getInvoiceAndPay(pay.invoice);
      if (resp?.pay) {
        resp.set(pay);
        await resp.save();
      } else {
        resp = await Pay.create(pay);
      }


      if (invoice) await this.setPoToInvoice(invoice.id, resp);

      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async setPoToInvoice (idInvoice, pay) {
    try {
      await pay.setInvoice(idInvoice);
      return true
    } catch (error) {
      return false;
    }
  }
  // async getAllPay (include, where = null) {
  //   try {
  //     const resp = await Pay.findAll({
  //       where: where,
  //       include: include
  //     });
  //     return resp
  //   } catch (error) {
  //     return false;
  //   }
  // }

  async getInvoiceAndPay (invoiceNumber) {
    try {
      const invoice = await Invoice.findOne({
        where: {
          invoice: invoiceNumber
        },
        include:{
          model:Pay,
          as: 'pay'
        }
      });
      return invoice;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async deletePay (pay) {
    try {
      const deleteId = await Pay.destroy({
        // truncate: true,
        where: {
          id: pay.id
        }
      })
      return true;

    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = new PayRepository();