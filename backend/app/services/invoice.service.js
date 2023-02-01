'use strict';
const { InvoiceDocEntity } = require('../entities/invoiceDoc.entity');
const { FilterInvoiceEntity } = require('../entities/filterInvoice.entity');
const InvoiceRepository = require('../repositories/invoice.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
const PayRepository = require('../repositories/pay.repository');
// const { hashText } = require('../lib/crypto');
const { PayOrder, Pay, Site } = require('../models');
const { filters, createQueryField } = require('../lib/utils');
const { NotFoundError } = require('../entities/error-entity');

class InvoiceService {

  async deleteInvoice (invoiceNumber) {
    const invoice = await this.getAllInvoice({ factura: invoiceNumber });
    if (invoice.length == 0)
      throw new NotFoundError('Invoice NOT FOUND');
    if (invoice[0].pay)
      await PayRepository.deletePay(invoice[0].pay);

    const deleteInvoice = await InvoiceRepository.deleteInvoiceById(invoice[0].id);
    return true;
  }

  async createInvoice (invoices) {
    return Promise.all(invoices.filter(inv => inv['PO'] && inv['SUBTOTAL']).map(async invoice => {
      const invoiceDoc = new InvoiceDocEntity(invoice);
      const payOrder = await PayOrderRepository.getPoByReference(invoiceDoc.po);
      if(payOrder){
        const newInvoice = await InvoiceRepository.createInvoice(invoiceDoc, payOrder);
        if (newInvoice) {
          return { ...newInvoice, stateInvoice: 'new' };
        }
      }
      return { ...invoice, stateInvoice: 'omited' };
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
      return createQueryField(item, filters[item.as])
    })
  }

  return include;
}

const createWhereGetAll = async (filters = null) => {
  let where = {};
  if (filters.invoice) {
    for (const field of filters.invoice) {
      if (field.data || field.init || field.until) {
        where = { ...where, ...asingFilter(field).where};
      }
    }
    if (Object.keys(where).length) return where
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



const templateInclude = () => {
  return [
    {
      model: PayOrder,
      as: 'payOrder',
      include:
      {
        model: Site,
        as: 'site'
      }
    },
    {
      model: Pay,
      as: 'pay'
    }
  ];
}

module.exports = new InvoiceService();