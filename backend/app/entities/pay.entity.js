const { excelDateToJSDate } = require('../lib/utils')

class PayEntity {
  constructor (data) {

    this.documentNumber = data['Document Number'];
    this.amountUtilized = data[' Amount Utilized '];
    this.financialCost = data[' Financial Cost '];
    this.invoice = data['Invoice Number'];
    this.totalPaid = data['Total Pagado'];
    this.maturityDate = data.maturityDate ? excelDateToJSDate(data.maturityDate) : null;
    this.publishDate = data.publishDate ? excelDateToJSDate(data.publishDate) : null;
    this.datePay =  data.datePay ? excelDateToJSDate(data.datePay) : null;
    this.state = data['Status'];
    this.discountTime = data.discountTime ? excelDateToJSDate(data.discountTime) : null;
  }
}



module.exports = { PayEntity };
