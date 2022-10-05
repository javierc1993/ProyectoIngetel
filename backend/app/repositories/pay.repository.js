'use strict';
const { Pay } = require('../models');

class PayRepository {


  async createPay (pay, invoice = null) {
    try {
      const resp = await Pay.create(pay);
      if (invoice) {
        await this.setPoToPay(invoice.id, resp);
      }
      return resp;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // async setPoToPay (idPo, pay) {
  //   try {
  //     await pay.setPayOrder(idPo);
  //     return true
  //   } catch (error) {
  //     return false;
  //   }
  // }
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

  // async getPayByNumber (numberPay) {
  //   try {
  //     const pay = await Pay.findOne({
  //       where: {
  //         pay: numberPay
  //       }
  //     });
  //     return pay;
  //   } catch (error) {
  //     console.log(error)
  //     return null;
  //   }
  // }
}

module.exports = new PayRepository();