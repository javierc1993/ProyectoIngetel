const { excelDateToJSDate } = require('../lib/utils')

class ReleaseEntity {
  constructor (data) {
    this.proyect = data.proyect || null;
    this.woName = data.woName || null;
    this.vendorSapName = data.vendorSapName || null;
    this.iaDate = data.iaDate ? excelDateToJSDate(data.iaDate) : null;
    this.grDate = data.grDate ? excelDateToJSDate(data.grDate) : null;
    this.sgrNumber = data.sgrNumber || null;
    this.percent = data.percent || null;
    this.date = data.date ? excelDateToJSDate(data.date) : null;
    this.ppa = data.ppa ? excelDateToJSDate(data.ppa) : null;
    this.payOrderId = data.payOrder || null;
    this.releaseTypeId = data.releaseType || null;
    this.totalPercent = data.totalPercent;
  }
}

module.exports = { ReleaseEntity };
