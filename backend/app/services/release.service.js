'use strict';
const { ReleaseDocEntity } = require('../entities/releaseDoc.entity');
const { ReleaseEntity } = require('../entities/release.entity');
const ReleaseRepository = require('../repositories/release.repository');
const ReleaseTypeRepository = require('../repositories/releaseType.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
const { hashText } = require('../lib/crypto');
class ReleaseService {
  async createRelease (releases) {
    return Promise.all(releases.filter(rel => rel['Services Good receipt number (sGR)']).map(async release => {
      const releaseDoc = new ReleaseDocEntity(release);
      const payOrder = await PayOrderRepository.getPoByReference(releaseDoc.poNumber)
      const releaseType = await ReleaseTypeRepository.getReleaseTypeByName(releaseDoc.woName);
      await releaseType.percent.forEach(async percent => {
        const releaseToCreate = new ReleaseEntity({
          ...releaseDoc,
          percent: percent.dataValues.percent,
          date: releaseDoc[percent.dataValues.percentField.dataValues.fieldDateName],
          ppa: releaseDoc[percent.dataValues.percentField.dataValues.fieldPpaName],
          payOrder: payOrder?.id,
          releaseType: releaseType?.id
        });
        return ReleaseRepository.createRelease(releaseToCreate);
      });
    }));
  }
}

const setPoToRelease = async (release, reference) => {
  try {
    const po = await PayOrderRepository.getPoByReference(reference);
    if (po) await ReleaseRepository.setPayOrder(release, po.id);
    return true;
  } catch (err) {
    return false;
  }
}
const setReleaseTypeToRelease = async (release, typeRelease) => {
  try {
    const releaseType = await ReleaseTypeRepository.getReleaseTypeByName(typeRelease);
    console.log(releaseType);
    if (releaseType) await ReleaseRepository.setReleaseType(release, releaseType.id);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = new ReleaseService();