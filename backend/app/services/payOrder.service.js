'use strict';
const PayOrderRepository = require('../repositories/payOrder.repository');
const SiteRepository = require('../repositories/site.repository');
const UserRepository = require('../repositories/user.repository');

const { deleteDuplicateByLabel } = require('../lib/formatData');

class PayOrderService {
  async getPayOrders () {
    return PayOrderRepository.getAll();
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
        region: po['Regional'],
        scenery: po['Escenario '],
        band: po['Banda']
      }
      SiteRepository.newSite(site);
    })
    );

    const response = await Promise.all(request.filter(po => po.PO && po.PO != '' && po.PO != 'No aplica PO').map(async po => {
      const payOrder = {
        reference: po['PO'],
        value: po[' VALOR PO '],
        Sites: {
          name: po['SITE NAME'],
          smp: po['SMP'],
          scenery: po['Escenario '],
          region: po['Regional'],
          band: po['Banda']
        },
        Instalations:{
          date: po['instalacion']
        },
        Integrations:{
          date: po['Fecha de Integracion']
        },
        MosHws:{
          date: po['mos_HW']
        },
        OnAirs:{
          date: po['ON AIR']
        },
        Leaders:{
          name: po['Lider ']
        }
      }
      PayOrderRepository.createPayOrder(payOrder);
    })
    );
    console.log(response)
    return response;
  }
}


module.exports = new PayOrderService();