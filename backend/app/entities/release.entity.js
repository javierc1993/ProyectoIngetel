const {excelDateToJSDate} =require('../lib/utils')

class ReleaseEntity {
  constructor (data) {
    this.proyect = data.proyect || null;
    this.woName = data.woName || null;
    this.vendorSapName = data.vendorSapName|| null;
    this.iaDate = data.iaDate || null;
    this.grDate = data.grDate || null;
    this.sgrNumber = data.sgrNumber || null;
    this.percent = data.percent || null;
    this.date = data.date ? excelDateToJSDate(data.date + ' 00:00:00') : null;
    this.ppa = data.ppa ? excelDateToJSDate(data.ppa + ' 00:00:00') : null;
    this.payOrderId = data.payOrder || null;
    this.releaseTypeId = data.releaseType || null;
  }
}

module.exports = { ReleaseEntity };
