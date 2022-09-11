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
        region: po['Regional']
      }
      SiteRepository.createSite(site);
    })
    );

    const response = Promise.all(request.filter(po => po.PO && po.PO != '' && po.PO != 'No aplica PO').map(async po => {
      const payOrder = {
        reference: po['PO'],
        scenery: po['Escenario '],
        value: po[' VALOR PO '],
        band: po['Banda'],
        Sites: {
          name: po['SITE NAME'],
          smp: po['SMP'],
          region: po['Regional'],
        },
        Instalations: {
          date: po['instalacion']
        },
        Integrations: {
          date: po['Fecha de Integracion']
        },
        MosHws: {
          date: po['mos_HW']
        },
        OnAirs: {
          date: po['ON AIR']
        },
        Leaders: {
          name: po['Lider ']
        }
      }
      return PayOrderRepository.createPayOrder(payOrder);
    })
    );
    
    return response;
  }
}


module.exports = new PayOrderService();