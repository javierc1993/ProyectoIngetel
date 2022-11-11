const { excelDateToJSDate } = require('../lib/utils')

class PayEntity {
  constructor (data) {

    this.documentNumber = data.documentNumber;
    this.amountUtilized = data.amountUtilized;
    this.financialCost = data.financialCost;
    this.invoice = data.invoice;
    this.totalPaid = data.totalPaid;
    this.maturityDate = data.maturityDate ? excelDateToJSDate(data.maturityDate) : null;
    this.publishDate = data.publishDate ? excelDateToJSDate(data.publishDate) : null;
    this.datePay =  data.datePay ? excelDateToJSDate(data.datePay) : null;
    this.state = data.state;
    this.discountTime = data.discountTime ? excelDateToJSDate(data.discountTime) : null;
  }
}



module.exports = { PayEntity };
