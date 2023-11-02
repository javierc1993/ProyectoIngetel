const { excelDateToJSDate } = require('../lib/utils')

class PayDocEntity {
  constructor (data) {

    this.documentNumber = data['documentnumber'];
    this.amountUtilized = data['amountutilized'];
    this.financialCost = data['financialcost'];
    this.invoice = data['invoicenumber'];
    this.totalPaid = data['totalpagado'];
    this.maturityDate = data['maturitydate'];
    this.publishDate = data['publishdate'];
    this.datePay = data['uploaddate'];
    this.state = data['status'];
    this.discountTime = data['discounttime'];
  }
}



module.exports = { PayDocEntity };
