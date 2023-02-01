'use strict';
const { PayOrder, Instalation, Integration, Invoice, MosHw, OnAir, Production, Pay, Site, User, Release } = require('../models');
const SiteRepository = require('./site.repository');
const UserRepository = require('./user.repository');
const ReleaseRepository = require('./release.repository');
const PayRepository = require('./pay.repository');
const { Op, Sequelize } = require('sequelize');
const { ForbiddenError } = require('../entities/error-entity');
const {ReleaseEntity} = require('../entities/release.entity');
class PayOrderRepository {

  async deletePayOrderById (id) {
    try {
      const deleteId = await PayOrder.destroy({
        // truncate: true,
        where: {
          id: id
        }
      })
      return true;

    } catch (error) {
      console.log(error);
      throw new ForbiddenError();
    }
  }

  async getSiteByPrk (prk) {
    const site = await Site.findByPk(prk);
    return site;
  }
  async getPayByPrk (prk) {
    const pay = await Pay.findByPk(prk);
    return pay;
  }
  async getReleaseByPoId (poId) {
    const site = await Release.findOne({
      where: {
        payOrderId: poId
      }
    });
    return site;
  }

  async getInvoiceByPayOrderId (payOrderId) {
    const site = await Invoice.findAll({
      where: {
        payOrderId: payOrderId
      }
    });
    return site;
  }

  async getPayByInvoice (invoiceId) {

    return Pay.findAll({
      where: {
        invoiceId: invoiceId
      }
    });
  }

  async getAll (include, where = null) {

    if (where) {
      return PayOrder.findAll({
        where,
        include,
        attributes: {
          include: [
              [
                  Sequelize.literal(`(
                      SELECT SUM(invoices.percentInvoice)
                      FROM invoices 
                      WHERE
                      invoices.payOrderId = PayOrder.id
                  )`),
                  'invoicePercentTotal'
              ]
          ]
      }
      });

    }
    return PayOrder.findAll({
      include: include,
      attributes: {
        include: [
            [
                Sequelize.literal(`(
                    SELECT SUM(invoices.percentInvoice)
                    FROM invoices 
                    WHERE
                    invoices.payOrderId = PayOrder.id
                )`),
                'invoicePercentTotal'
            ]
        ]
    }
    });
  };

  async getPoByReference (reference) {
    const po = await PayOrder.findOne({
      where: {
        reference: reference
      }
    });
    return po;
  }

  async createPayOrder (po) {

    try {
      let site;
      let leader;
      if (po.Sites.smp) {
        site = await SiteRepository.createSite(po.Sites)
        po.siteId = site.dataValues.id
      }
      if (po.Leaders.name) {
        leader = await UserRepository.newLeader(po.Leaders.name)
        po.leaderId = leader[0].dataValues.id
      }
      let resp = await this.getPoByReference(po.reference);
      if (!resp) {
        resp = await PayOrder.create(po);
        if (po.Instalations.date) Instalation.create({ date: po.Instalations.date, payOrderId: resp.id });
        if (po.Integrations.date) Integration.create({ date: po.Integrations.date, payOrderId: resp.id });
        if (po.MosHws.date) MosHw.create({ date: po.MosHws.date, payOrderId: resp.id });
        if (po.OnAirs.date) OnAir.create({ date: po.OnAirs.date, payOrderId: resp.id });
      }

      resp.set(po);
      if (po.Instalations.date) Instalation.update({ date: po.Instalations.date }, { where: { payOrderId: resp.id } });
      if (po.Integrations.date) Integration.update({ date: po.Integrations.date }, { where: { payOrderId: resp.id } });
      if (po.MosHws.date) MosHw.update({ date: po.MosHws.date }, { where: { payOrderId: resp.id } });
      if (po.OnAirs.date) OnAir.update({ date: po.OnAirs.date }, { where: { payOrderId: resp.id } });
      return resp.save();
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateValuePayOrder (reference, value) {
    let po = await this.getPoByReference(reference);
    if (po) {
      po.value = value;
      po.save();
      return true
    }
    return false;
  }


  async updatePayOrder (reference, value, oldValue) {
    console.log(oldValue.invoice);
    let po = await this.getPoByReference(reference);
    if (po) {
      po.value = value.valorPo;
      po.band = oldValue.band;
      po.scenery = value.scenery;
      po.poDate = new Date(value.poDate);
      po.save();
      let site = await this.getSiteByPrk(po.siteId);
      if (site) {
        site.name = value.siteName;
        site.region = value.regionName;
        site.smp = value.smp;
        site.save();
        
        if(oldValue.release[0]){
        let release = new Object();
        release = {
          proyect: oldValue.release[0].proyect,
          woName: oldValue.release[0].woName,
          vendorSapName: oldValue.release[0].vendorSapName ,
          iaDate: oldValue.release[0].iaDate,
          grDate: oldValue.release[0].grDate,
          sgrNumber: oldValue.release[0].sgrNumber,
          payOrderId:po.id,
          totalPercent: value.releases
        };
        let response= await ReleaseRepository.createRelease(release);
      }else{
        let release = await this.getReleaseByPoId(po.id);
        release.totalPercent = value.releases;
        release.save();
      }   
          let releaseData = await this.getReleaseByPoId(po.id);
          let invoice = await this.getInvoiceByPayOrderId(releaseData.payOrderId);
          var that = this;
          if (invoice) {
            oldValue.invoice.forEach(async function (invoiceUpdate, i) {
              invoice.forEach(async function (invoiceUpdated, j) {

                if (invoiceUpdate.invoice === invoiceUpdated.invoice) {

                  invoiceUpdated.invoice = invoiceUpdate.invoice;
                  invoiceUpdated.subTotal = invoiceUpdate.subTotal;
                  invoiceUpdated.iva = invoiceUpdate.iva;
                  invoiceUpdated.date = new Date(invoiceUpdate.date);
                  invoiceUpdated.rtf = invoiceUpdate.rtf;
                  invoiceUpdated.rtIva = invoiceUpdate.rtIva;
                  invoiceUpdated.toPaid;
                  invoiceUpdated.totalPaid = invoiceUpdate.totalPaid;
                  invoiceUpdated.percentInvoice = invoiceUpdate.percentInvoice;
                  invoice[j].save();


                  
                  let payData = await that.getPayByPrk(invoice[j].id);
                  let pay = new Object();
                  if (payData) {
                    pay.documentNumber = invoiceUpdate.pay.documentNumber;
                    pay.amountUtilized = invoiceUpdate.pay.amountUtilized;
                    pay.financialCost = invoiceUpdate.pay.financialCost;
                    pay.totalPaid = invoiceUpdate.pay.totalPaid;
                    pay.datePay = new Date(invoiceUpdate.pay.datePay);
                    pay.save();
                  }else{
                    pay.invoiceId = invoiceUpdate.pay.invoiceId;
                    pay.documentNumber = invoiceUpdate.pay.documentNumber;
                    pay.amountUtilized = invoiceUpdate.pay.amountUtilized;
                    pay.financialCost = invoiceUpdate.pay.financialCost;
                    pay.totalPaid = invoiceUpdate.pay.totalPaid;
                    pay.datePay = new Date(invoiceUpdate.pay.datePay);
                    let response= await PayRepository.createPay(pay);
                  }
                }

              })
            });

          }
          
        
      }

      return true
    }

    return false;
  }
}

module.exports = new PayOrderRepository();