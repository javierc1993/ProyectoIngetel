'use strict';
const { Pay } = require('../models');

class PayRepository {


  async createPay (pay, invoice = null) {
    try {
      let resp = await this.getPayByNumber(pay.documentNumber);
      if (!resp) {
        resp = await Pay.create(pay);
      } else {
        resp.set(pay);
        await resp.save();
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

  async getPayByNumber (numberPay) {
    try {
      const pay = await Pay.findOne({
        where: {
          documentNumber: numberPay
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