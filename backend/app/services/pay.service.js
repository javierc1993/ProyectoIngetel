'use strict';
const { PayDocEntity } = require('../entities/payDoc.entity');
const { PayEntity } = require('../entities/pay.entity');
const { FilterPayEntity } = require('../entities/filterPay.entity');
const PayRepository = require('../repositories/pay.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
// const { hashText } = require('../lib/crypto');
const { PayOrder } = require('../models');
const { filters } = require('../lib/utils');
const invoiceRepository = require('../repositories/invoice.repository');


class PayService {
  async createPay (pays) {
    return Promise.all(pays.filter(paid => paid['Total Pagado'] && paid['Invoice Number'] && paid['Amount Utilized'] && paid['Upload Date']).map(async pay => {
      const payDoc = new PayDocEntity(pay);
      const invoice = await invoiceRepository.getInvoiceByNumber(payDoc.invoice);
      if(invoice){
        const newPay = await PayRepository.createPay(new PayEntity(payDoc), invoice);
        if (newPay) {
          return { ...newPay, statePay: 'new' };
        }
      }
      return { ...payDoc, statePay: 'omited' };
    }));
  }

  async getAllPay (filters = null) {
    filters = new FilterPayEntity(filters);
    const include = await createIncludeGetAll(filters);
    const where = await createWhereGetAll(filters);
    const response = await PayRepository.getAllPay(include, where);
    return response;
  }
}



const createIncludeGetAll = async (filters = null) => {
  let include = templateInclude();
  if (filters) {
    include = await include.map(item => {
      if (filters[item.as].data) return createQueryField(item, filters[item.as])
      return item;
    })
  }

  return include;
}

const createWhereGetAll = async (filters = null) => {
  let where = {};
  let fields = ['client', 'date', 'pay', 'subTotal', 'iva', 'total', 'rtf', 'rtIva', 'toPaid', 'totalPaid', 'datePay', 'release', 'percentPay', 'observation', 'state'];
  if (filters) {
    for (const field of fields) {
      if (filters[field]?.data) {
        where = { ...where, ...asingFilter(filters[field]).where };
      }
    }
    if (Object.keys(where).length) return where;
  }
  return null;
}

const asingFilter = (filter) => {

  return filters[filter.type]({}, filter)

}

const createQueryField = (item, filter) => {
  return filters[filter?.type](item, filter);
}



const templateInclude = () => {
  return [
    {
      model: PayOrder,
      as: 'payOrder'
    }
  ];
}

module.exports = new PayService();