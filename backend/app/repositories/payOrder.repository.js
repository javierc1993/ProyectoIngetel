'use strict';
const { PayOrder, Instalation, Integration, Invoice, MosHw, OnAir, Production, Pay, Site, User, Release } = require('../models');
const SiteRepository = require('./site.repository');
const UserRepository = require('./user.repository');
const { Op, Sequelize } = require('sequelize');
const { ForbiddenError } = require('../entities/error-entity');

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
        where: where,
        include: include
      });

    }
    return PayOrder.findAll({
      include: include
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
        po.siteId = site[0].dataValues.id
      }
      if (po.Leaders.name) {
        leader = await UserRepository.newLeader(po.Leaders.name)
        po.leaderId = leader[0].dataValues.id
      }
      let resp = await this.getPoByReference(po.reference);
      if (!resp) {
        resp = await PayOrder.create(po);
        Instalation.create({ date: po.Instalations.date, payOrderId: resp.id });
        Integration.create({ date: po.Integrations.date, payOrderId: resp.id });
        MosHw.create({ date: po.MosHws.date, payOrderId: resp.id });
        OnAir.create({ date: po.OnAirs.date, payOrderId: resp.id });
      }

      resp.set(po);
      Instalation.update({ date: po.Instalations.date }, { where: { payOrderId: resp.id } });
      Integration.update({ date: po.Integrations.date }, { where: { payOrderId: resp.id } });
      MosHw.update({ date: po.MosHws.date }, { where: { payOrderId: resp.id } });
      OnAir.update({ date: po.OnAirs.date }, { where: { payOrderId: resp.id } });
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
    let po = await this.getPoByReference(reference);
    //console.log(po);
    if (po) {
      po.value = value.valorPo;
      po.band = oldValue.band;
      po.scenery = value.scenery;
      po.save();
      let site = await this.getSiteByPrk(po.siteId);

      if (site) {
        site.name = value.siteName;
        site.region = value.regionName;
        site.smp = value.smp;
        site.save();
        let release = await this.getReleaseByPoId(po.id);

        if (release) {
          release.totalPercent = value.releases;
          release.save();
          let invoice = await this.getInvoiceByPayOrderId(release.payOrderId);

          if (invoice) {
            value.invoices.forEach(function (invoiceUpdate, i) {
              invoice.forEach(function (invoiceUpdated, j) {
                if (invoiceUpdate.invoice === invoiceUpdated.invoice) {

                  invoiceUpdated.invoice = invoiceUpdate.invoice;
                  invoiceUpdated.subTotal = invoiceUpdate.subTotal;
                  invoiceUpdated.iva = invoiceUpdate.iva;
                  invoiceUpdated.total;
                  invoiceUpdated.rtf = invoiceUpdate.rtf;
                  invoiceUpdated.rtIva = invoiceUpdate.rtIva;
                  invoiceUpdated.toPaid;
                  invoiceUpdated.totalPaid = invoiceUpdate.totalPaid;
                  invoiceUpdated.percentInvoice = invoiceUpdate.totalPaid;
                  invoiceUpdated.state = invoiceUpdate.status;
                  invoice[j].save();
                }

              })
            });

          }

        }
      }

      return true
    }

    return false;
  }
}

module.exports = new PayOrderRepository();