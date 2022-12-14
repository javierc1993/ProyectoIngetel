'use strict';
const { ReleaseDocEntity } = require('../entities/releaseDoc.entity');
const { ReleaseEntity } = require('../entities/release.entity');
const ReleaseRepository = require('../repositories/release.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
const { hashText } = require('../lib/crypto');
class ReleaseService {
  async createRelease (releases) {
    return Promise.all(releases.filter(rel => rel['Services Good receipt number (sGR)']).map(async release => {
      const releaseDoc = new ReleaseDocEntity(release);
      const payOrder = await PayOrderRepository.getPoByReference(releaseDoc.poNumber);
      const releaseToCreate = new ReleaseEntity({
        ...releaseDoc,
        payOrder: payOrder?.id,
        totalPercent: +releaseDoc.serviceExecutedPercent + releaseDoc.totalTss + releaseDoc.totalCw + releaseDoc.totalImp
      });
      return ReleaseRepository.createRelease(releaseToCreate);
    }));
  }
}



module.exports = new ReleaseService();