

class ReleaseEntity {
  constructor (data) {
    this.proyect = data.proyect || null;
    this.woName = data.woName || null;
    this.vendorSapName = data.vendorSapName|| null;
    this.iaDate = data.iaDate || null;
    this.grDate = data.grDate || null;
    this.sgrNumber = data.sgrNumber || null;
    this.percent = data.percent || null;
    this.date = data.date || null;
    this.ppa = data.ppa || null;
    this.payOrderId = data.payOrder || null;
    this.releaseTypeId = data.releaseType || null;
  }
}

module.exports = { ReleaseEntity };
