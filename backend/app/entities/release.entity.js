const { excelDateToJSDate } = require('../lib/utils')

class ReleaseEntity {
  constructor (data) {
    this.proyect = data.proyect || null;
    this.woName = data.woName || null;
    this.vendorSapName = data.vendorSapName || null;
    this.iaDate = data.iaDate ? excelDateToJSDate(data.iaDate) : null;
    this.grDate = data.grDate ? excelDateToJSDate(data.grDate) : null;
    this.sgrNumber = data.sgrNumber || null;
    this.payOrderId = data.payOrder || null;
    this.totalPercent = data.totalPercent;
  }
}

module.exports = { ReleaseEntity };
