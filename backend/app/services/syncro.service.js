'use strict';
const { SyncroDocEntity } = require('../entities/syncroDoc.entity');
const PayOrderRepository = require('../repositories/payOrder.repository');
const { hashText } = require('../lib/crypto');
const { deleteDuplicateByLabel } = require('../lib/formatData');

class SyncroService {
  async createSyncro (syncros) {
    const syncrosFiltered = await deleteDuplicateByLabel(syncros, 'purchasedocnumber')
    return Promise.all(syncrosFiltered.filter(sync => sync['purchasedocnumber'] && sync['netprice']).map(async syncro => {
      const syncroDoc = new SyncroDocEntity(syncro);
      const poUpdated = await PayOrderRepository.updateValuePayOrder(syncroDoc.purchaseDocNumber, syncroDoc.netPrice);
      return { ...syncro, updatedValue: poUpdated };
    }));
  }

}




module.exports = new SyncroService();