const { excelDateToJSDate } = require('../lib/utils')

class PayDocEntity {
  constructor (data) {

    this.documentNumber = data['Document Number'];
    this.amountUtilized = data[' Amount Utilized '];
    this.financialCost = data[' Financial Cost '];
    this.invoice = data['Invoice Number'];
    this.totalPaid = data['Total Pagado'];
    this.maturityDate = data['Maturity Date'];
    this.publishDate = data['Publish Date'];
    this.datePay =  data['Upload Date'];
    this.state = data['Status'];
    this.discountTime = data['Discount Time'];
  }
}



module.exports = { PayDocEntity };
