'use strict';
const { ReleaseDocEntity } = require('../entities/releaseDoc.entity');
const { ReleaseEntity } = require('../entities/release.entity');
const ReleaseRepository = require('../repositories/release.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
const { hashText } = require('../lib/crypto');
const { deleteDuplicateByLabel } = require('../lib/formatData');

class ReleaseService {
  async createRelease (releases) {
    try {
      const releasesFiltered = await deleteDuplicateByLabel(releases, 'sponumber')
      return Promise.all(releasesFiltered.filter(rel => rel.sponumber).map(async release => {
        const releaseDoc = new ReleaseDocEntity(release);
        const payOrder = await PayOrderRepository.getPoByReference(releaseDoc.poNumber);
        const releaseToCreate = new ReleaseEntity({
          ...releaseDoc,
          payOrder: payOrder?.id,
          totalPercent: +releaseDoc.serviceExecutedPercent + releaseDoc.totalTss + releaseDoc.totalCw + releaseDoc.totalImp
        });
        return ReleaseRepository.createRelease(releaseToCreate);
      }));
    } catch (error) {
      console.log(error);
      throw error; 
    }
  } 
}



module.exports = new ReleaseService();