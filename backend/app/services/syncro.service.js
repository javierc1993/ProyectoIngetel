'use strict';
const { SyncroDocEntity } = require('../entities/syncroDoc.entity');
const PayOrderRepository = require('../repositories/payOrder.repository');
const { hashText } = require('../lib/crypto');


class SyncroService {
  async createSyncro (syncros) {
    return Promise.all(syncros.filter(sync => sync['Purchase Doc Number'] && sync['Net Price']).map(async syncro => {
      const syncroDoc = new SyncroDocEntity(syncro);
      const poUpdated = await PayOrderRepository.updateValuePayOrder(syncroDoc.purchaseDocNumber, syncroDoc.netPrice);
      return { ...syncro, updatedValue: poUpdated };
    }));
  }

}




module.exports = new SyncroService();