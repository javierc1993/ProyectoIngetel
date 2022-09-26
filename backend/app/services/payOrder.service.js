'use strict';
const { Op, Sequelize } = require('sequelize');

const { Instalation, Integration, MosHw, OnAir, Site, User, Release } = require('../models');
const PayOrderRepository = require('../repositories/payOrder.repository');
const SiteRepository = require('../repositories/site.repository');
const UserRepository = require('../repositories/user.repository');

const { deleteDuplicateByLabel } = require('../lib/formatData');
const { FilterProductionEntity } = require('../entities/filterProduction.entity');
const { PayOrderEntity } = require('../entities/payOrder.entity');

class PayOrderService {
  async getPayOrders (filters = null) {
    const include = await createIncludeGetAll(filters);
    const where = await createWhereGetAll(filters);
    return PayOrderRepository.getAll(include, where);
  }


  async createPayOrders (request) {
    const sitesOnly = await deleteDuplicateByLabel(request, 'SMP')
    const leadersOnly = await deleteDuplicateByLabel(request, 'Lider ')

    const leadersCreated = await Promise.all(leadersOnly.filter(po => po['Lider ']).map(async po => {
      UserRepository.newLeader(po['Lider ']);
    })
    );

    const siteSaved = await Promise.all(sitesOnly.filter(po => po.SMP).map(async po => {
      const site = {
        name: po['SITE NAME'],
        smp: po.SMP,
        region: po['Regional']
      }
      SiteRepository.createSite(site);
    })
    );

    const response = Promise.all(request.filter(po => po.PO && po.PO != '' && po.PO != 'No aplica PO').map(async po => {
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
    const filterFormat = new FilterProductionEntity(filters);
    include = await include.map(item => {
      return createQueryField(item, filterFormat[item.as])
    })
  }

  return include;
}
const createWhereGetAll = async (filters = null) => {
  let where = {};
  let fields = ['reference', 'valuedPayOrder', 'scenery', 'band'];
  if (filters) {
    const filterFormat = new FilterProductionEntity(filters);
    fields.forEach(field => {
      if (filterFormat[field]?.data) {
        where[filterFormat[field].fieldName] = filterFormat[field].data
      }
    })
    if(Object.keys(where).length) return where
  }
  return null;
}

const createQueryField = (item, filter) => {
  return filters[filter.type](item, filter);

}

const filters = {
  date: (item, filter) => {
    const { init, until, fieldName } = filter;
    let search = {};
    if (init || until) {
      if (init && until) {
        search = { [Op.gte]: init, [Op.lte]: until };
      } else {
        if (init) search = { [Op.gte]: init };
        if (until) search = { [Op.lte]: until };
      }
      item.where = {};
      item.where[fieldName] = search;
      return item;
    }
    return item;
  },

  number: (item, filter) => {
    const { data, operator, fieldName } = filter
    if (data) {
      item.Where = {};
      let search = data;
      if (operator == 'top') search = { [Op.gte]: data }
      if (operator == 'button') search = { [Op.lte]: data }
      item.where[fieldName] = search;
      return item;
    }
    return item;

  },
  string: (item, filter) => {
    const { data, operator, fieldName } = filter

    if (data) {
      // if (item.as == 'leader') {
      //   item.where = Sequelize.where(Sequelize.fn('concat', Sequelize.col('name'), ' ', Sequelize.col('lastname')), 
      //   {
      //     [Op.like]: `%${data}%`
      //   });
      //   return item;
      // }
      item.where = {};
      let search = data;
      if (operator == 'content') search = { [Op.like]: `%${data}%` }
      if (operator == 'noContent') search = { [Op.notLike]: `%${data}%` }
      item.where[fieldName] = search;
      return item;
    }
    return item;
  }


}




const templateInclude = () => {
  return [
    {
      model: Instalation,
      as: 'instalation',
      attributes: ['date']
    },
    {
      model: Integration,
      as: 'integration',
      attributes: ['date']
    },
    {
      model: MosHw,
      as: 'mosHw',
      attributes: ['date']
    },
    {
      model: OnAir,
      as: 'onAir',
      attributes: ['date']
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
    }
  ];
}



module.exports = new PayOrderService();