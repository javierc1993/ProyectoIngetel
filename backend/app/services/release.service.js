'use strict';
const { ReleaseEntity } = require('../entities/release.entity');
const ReleaseRepository = require('../repositories/release.repository');
const { hashText } = require('../lib/crypto');
class ReleaseService {
  async createRelease (releases) {
    const resp = await Promise.all(releases.filter(rel => rel['Services Good receipt number (sGR)']).map(async release => {
    // const resp = await Promise.all(releases.map(async release => {
      const releaseModel = new ReleaseEntity(release);
      return ReleaseRepository.createRelease(releaseModel);
    }));
    return resp;
  }
}

module.exports = new ReleaseService();