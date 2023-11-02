

class SyncroDocEntity {
  constructor (data) {
    this.lineStatus = data.linestatus || null;
    this.supplierNumber = data.suppliernumber || null;
    this.docDate = data.docdate || null;
    this.purchaseDocNumber = data.purchasedocnumber || null;
    this.line = data.line || null;
    this.materialCode = data.materialcode || null;
    this.description = data.description || null;
    this.plant = data.plant || null;
    this.deliveryDate = data.deliverydate || null;
    this.netPrice = data.netprice || null;
    this.wbs = data.wbs || null;
    this.deliveryAddress = data.deliveryaddress || null;
  }
}

module.exports = { SyncroDocEntity };
