'use strict';
const { InvoiceDocEntity } = require('../entities/invoiceDoc.entity');
const { FilterInvoiceEntity } = require('../entities/filterInvoice.entity');
const InvoiceRepository = require('../repositories/invoice.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
// const { hashText } = require('../lib/crypto');
const { PayOrder } = require('../models');
const { filters } = require('../lib/utils');


class InvoiceService {
  async createInvoice (invoices) {
    return Promise.all(invoices.filter(inv => inv['PO'] && inv['SUBTOTAL']).map(async invoice => {
      const invoiceDoc = new InvoiceDocEntity(invoice);
      const payOrder = await PayOrderRepository.getPoByReference(invoiceDoc.po);
      const newInvoice = await InvoiceRepository.createInvoice(invoiceDoc, payOrder);
      if (newInvoice) {
        return { ...newInvoice, stateInvoice: 'new' };
      }
      return { ...invoiceDoc, stateInvoice: 'omited' };
    }));
  }

  async getAllInvoice (filters = null) {
    filters = new FilterInvoiceEntity(filters);
    const include = await createIncludeGetAll(filters);
    const where = await createWhereGetAll(filters);
    const response = await InvoiceRepository.getAllInvoice(include, where);
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
  let fields = ['client', 'date', 'invoice', 'subTotal', 'iva', 'total', 'rtf', 'rtIva', 'toPaid', 'totalPaid', 'datePay', 'release', 'percentInvoice', 'observation', 'state'];
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

module.exports = new InvoiceService();