'use strict';
const { ReleaseEntity } = require('../entities/release.entity');
const ReleaseRepository = require('../repositories/release.repository');
const ReleaseTypeRepository = require('../repositories/releaseType.repository');
const PayOrderRepository = require('../repositories/payOrder.repository');
const { hashText } = require('../lib/crypto');
class ReleaseService {
  async createRelease (releases) {
    // const resp = await Promise.all(releases.filter(rel => rel['Services Good receipt number (sGR)']).map(async release => {
    const resp = releases.filter(rel => rel['Services Good receipt number (sGR)']).map(async release => {
      const releaseModel = new ReleaseEntity(release);
      const releaseNew = await ReleaseRepository.createRelease(releaseModel);
      setPoToRelease(releaseNew, releaseModel.poNumber);
      // console.log(releaseModel.woName);
      setReleaseTypeToRelease(releaseNew, releaseModel.woName);
      return releaseNew;
    });
    return resp;
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