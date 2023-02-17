'use strict';
const { Pay, Invoice } = require('../models');

class PayRepository {


  async createPay (pay, invoice) {
    try {
      let resp = await this.getPayByInvoiceId(invoice.id);
      if (resp) {
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

  async getPayByInvoiceId (invoiceId) {
    try {
      const pay = await Pay.findOne({
        where:{
          invoiceId:invoiceId
        }
      });
      return pay;
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