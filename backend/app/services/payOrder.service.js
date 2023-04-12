'use strict';
const { Op, Sequelize } = require('sequelize');

const { Instalation, Integration, MosHw, OnAir, Site, User, Release, Pay, Invoice, MainSite } = require('../models');
const PayOrderRepository = require('../repositories/payOrder.repository');
const SiteRepository = require('../repositories/site.repository');
const MainSiteRepository = require('../repositories/mainSite.repository');
const UserRepository = require('../repositories/user.repository');
const InstalationRepository = require('../repositories/instalation.repository');
const IntegrationRepository = require('../repositories/integration.repository');
const MosHwRepository = require('../repositories/mosHw.repository');
const OnAirRepository = require('../repositories/onAir.repository');
const PayRepository = require('../repositories/pay.repository')

const { deleteDuplicateByLabel } = require('../lib/formatData');
const { FilterProductionEntity } = require('../entities/filterProduction.entity');
const { PayOrderEntity } = require('../entities/payOrder.entity');
const { NotFoundError } = require('../entities/error-entity');
const InvoiceRepository = require('../repositories/invoice.repository');

const { filters, createQueryField } = require('../lib/utils');

class PayOrderService {
  async deletePayOrder (reference) {
    const po = await this.getPayOrders({ PO: reference });
    if (po.length == 0)
      throw new NotFoundError('Pay order not found');
    // delete: [instalations, integrations, mosHws, onAirs, pays, invoice]
    // const delInstalations = await deleteInstalations()
    if(po[0].instalation) await InstalationRepository.deleteInstalationById(po[0].instalation.id)
    if(po[0].integration) await IntegrationRepository.deleteIntegrationById(po[0].integration.id)
    if(po[0].mosHw) await MosHwRepository.deleteMosHwById(po[0].mosHw.id)
    if(po[0].onAir) await OnAirRepository.deleteOnAirById(po[0].onAir.id)
    if (po[0].invoice.length) {
      po[0].invoice.forEach(async invoice => {
        if(invoice.pay) await PayRepository.deletePay(invoice.pay)
        const deleteInvoice = await  InvoiceRepository.deleteInvoice(invoice)
      });
    }
    const deletePo = await PayOrderRepository.deletePayOrderById(po[0].id);
    return true;
  }

  async getPayOrders (filters = null) {
    filters = new FilterProductionEntity(filters);
    const having = await createHavingGetAll(filters);
    const include = await createIncludeGetAll(filters);
    const where = await createWhereGetAll(filters);
    const payOrders = await PayOrderRepository.getAll(include, where, having);
    return payOrders;
  }

  async createPayOrders (request) {
    const sitesOnly = await deleteDuplicateByLabel(request, 'SMP')
    const leadersOnly = await deleteDuplicateByLabel(request, 'Lider ')

    const leadersCreated = await Promise.all(leadersOnly.filter(po => po['Lider ']).map(async po => {
      const resp = await UserRepository.newLeader(po['Lider ']);
      return resp;
    })
    );

    const siteSaved = await Promise.all(sitesOnly.filter(po => po.SMP).map(async po => {
     
      const site = {
        name: po['SITE NAME'],
        smp: po.SMP,
        region: po['Regional'],
        proyect: po['Proyecto '],
        mainSmp: po['SMP Principal']
      }
     
      const resp = await SiteRepository.createOrUpdateSite(site);
      return resp;
    })
    );

    const response = Promise.all(request.filter(po => po.PO && po.PO != '' && po.PO != 'No aplica PO' && po.SMP).map(async po => {
      const payOrder = new PayOrderEntity(po);
      return PayOrderRepository.createPayOrder(payOrder);
    })
    );

    return response;
  }
}

const createIncludeGetAll = async (filters = null) => {
  let include = templateInclude();
  if (filters) {
    include = await include.map(item => {
      return createQueryField(item, filters[item.as])
    })
  }

  return include;
}
const createWhereGetAll = async (filters = null) => {
  let where = {};
  if (filters.payOrder) {
    for (const field of filters.payOrder) {
      if (field.data || field.init || field.until) {
        where = { ...where, ...asingFilter(field).where};
      }
    }
    if (Object.keys(where).length) return where
  }
  return null;
}
const createHavingGetAll = async (filters = null) => {
  const data = filters?.sumPercentInvoice?.data;
  const operator = filters?.sumPercentInvoice?.operator;
  if(filters) delete filters.sumPercentInvoice;
  if (data) {
    let resp = {invoicePercentTotal: data};
    if(operator == 'top') resp.invoicePercentTotal={[Op.gte]: data}
    if(operator == 'button') resp.invoicePercentTotal={[Op.lte]: data}
    return resp;
    }
  return null;
}

const asingFilter = (filter) => {

  return filters[filter.type]({}, filter)

}

// const createQueryField = (item, filter) => {
//   console.log(filter)
//   for(const filterItem of filter){
//     item = filters[filterItem.type](item, filterItem);
//   }
//   return item;

// }

// const filters = {
//   date: (item, filter) => {
//     const { init, until, fieldName } = filter;
//     let search = {};
//     if (init || until) {
//       if (init && until) {
//         search = { [Op.gte]: init, [Op.lte]: until };
//       } else {
//         if (init) search = { [Op.gte]: init };
//         if (until) search = { [Op.lte]: until };
//       }
//       item.where = {};
//       item.where[fieldName] = search;
//       return item;
//     }
//     return item;
//   },

//   number: (item, filter) => {
//     const { data, operator, fieldName } = filter
//     if (data) {
//       item.where = {};
//       let search = data;
//       if (operator == 'top') search = { [Op.gte]: data }
//       if (operator == 'button') search = { [Op.lte]: data }
//       item.where[fieldName] = search;
//       return item;
//     }
//     return item;

//   },
//   string: (item, filter) => {
//     const { data, operator, fieldName } = filter

//     if (data) {
//       // if (item.as == 'leader') {
//       //   item.where = Sequelize.where(Sequelize.fn('concat', Sequelize.col('name'), ' ', Sequelize.col('lastname')), 
//       //   {
//       //     [Op.like]: `%${data}%`
//       //   });
//       //   return item;
//       // }
//       if(!item.where) item.where = {};
//       let search = data;
//       if (operator == 'content') search = { [Op.like]: `%${data}%` }
//       if (operator == 'noContent') search = { [Op.notLike]: `%${data}%` }
//       item.where[fieldName] = search;
//       return item;
//     }
//     return item;
//   }


// }




const templateInclude = () => {
  return [
    {
      model: Instalation,
      as: 'instalation',
      attributes: ['id', 'date']
    },
    {
      model: Integration,
      as: 'integration',
      attributes: ['id', 'date']
    },
    {
      model: MosHw,
      as: 'mosHw',
      attributes: ['id', 'date']
    },
    {
      model: OnAir,
      as: 'onAir',
      attributes: ['id', 'date']
    },
    {
      model: Site,
      as: 'site'
    },
    {
      model: User,
      as: 'leader'
    },
    {
      model: Release,
      as: 'release'
    },
    {
      model: Invoice,
      as: 'invoice',
      include: {
        model: Pay,
        as: 'pay'
      }
    }
  ];
}



module.exports = new PayOrderService();