

class SyncroDocEntity {
  constructor (data) {
    this.lineStatus = data['Line Status'] || null;
    this.supplierNumber = data['Supplier Number'] || null;
    this.docDate = data['Doc Date'] || null;
    this.purchaseDocNumber = data['Purchase Doc Number'] || null;
    this.line = data['Line'] || null;
    this.materialCode = data['Material Code'] || null;
    this.description = data['Description'] || null;
    this.plant = data['Plant'] || null;
    this.deliveryDate = data['Delivery Date'] || null;
    this.netPrice = data['Net Price'] || null;
    this.wbs = data['WBS'] || null;
    this.deliveryAddress = data['Delivery Address'] || null;
  }
}

module.exports = { SyncroDocEntity };
