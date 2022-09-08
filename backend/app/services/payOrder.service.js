'use strict';
const PayOrderRepository = require('../repositories/payOrder.repository');
const SiteRepository = require('../repositories/site.repository');
const { deleteDuplicateByLabel } = require('../lib/formatData');

class PayOrderService {


  async createPayOrders (request) {
    const sitesOnly = await deleteDuplicateByLabel(request, 'SMP')
    const siteSaved = await Promise.all(sitesOnly.filter(po => po.SMP).map(async po => {
      const site = {
        name: po['SITE NAME'],
        smp: po.SMP,
        region: po['Regional'],
        scenery: po['Escenario'],
        band: po['Banda']
      }
      SiteRepository.newSite(site);
    })
    );

    const response = await Promise.all(request.filter(po => po.PO != '' ).map(async po => {
      const payOrder = {
        reference: po['PO'],
        value: po[' VALOR PO '],
        Sites: {
          name: po['SITE NAME'],
          smp: po['SMP'],
          scenery: po['Escenario'],
          region: po['Regional'],
          band: po['Banda']
        }
      }
      await PayOrderRepository.createPayOrder(payOrder);
    })
    );
    // return response;
    return response;
  }
}


module.exports = new PayOrderService();