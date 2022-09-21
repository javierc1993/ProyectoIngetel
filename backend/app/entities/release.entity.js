

class ReleaseEntity {
  constructor (data) {
    this.proyect = data['Project'] || null;
    this.woName = data['WO Name'] || null;
    this.vendorSapName = data['Vendor SAP Name'] || null;
    this.iaDate = data['IA Date'] || null;
    this.grDate = data['GR Date'] || null;
    this.sgrNumber = data['Services Good receipt number (sGR)'] || null;
    this.rfeNotified = data['TSSR Enviado al Cliente'] || null;
    this.rfeNotifiedPpa = data['TSSR Enviado al Cliente PPA Date'] || null;
    this.rfeNotifiedPercent = data['TSSR Enviado al Cliente %'] || null;
    this.tssrClient = data['IS5.1 TSSR Approved'] || null;
    this.tssrClientPpa = data['IS5.1 TSSR Approved PPA Date'] || null;
    this.tssrClientPercent = data['IS5.1 TSSR Approved %'] || null;
    this.tssrApproved = data['IS5.1 TSSR Approved'] || null;
    this.tssrApprovedPpa = data['IS5.1 TSSR Approved PPA Date'] || null;
    this.tssrApprovedPercent = data['IS5.1 TSSR Approved %'] || null;
    this.executeCw = data['Execute CW+Reg Fotografico Date'] || null;
    this.executeCwPpa = data['Execute CW+Reg Fotografico PPA Date'] || null;
    this.executeCwPercent = data['Execute CW+Reg Fotografico %'] || null;
    this.finalDocument = data['Documento Final Ok Date'] || null;
    this.finalDocumentPpa = data['Doc Final ok PPA Date'] || null;
    this.finalDocumentPercent = data['Doc Final ok Partner %'] || null;
    this.instalation = data['Installation Doc. Ok Date'] || null;
    this.instalationPpa = data['Doc. Installation PPA Date'] || null;
    this.instalationPercent = data['Doc. Installation %'] || null;
    this.integrationDocument = data['Integration Doc. Ok Date'] || null;
    this.integrationDocumentPpa = data['Doc. Integration PPA Date'] || null;
    this.integrationDocumentPercent = data['Doc. Integration %'] || null;
    this.siteFolderApproved = data['Site Folder Approved by Cust. Date'] || null;
    this.siteFolderApprovedPpa = data['Site Folder Approved by Cust. PPA Date'] || null;
    this.siteFolderApprovedPercent = data['Site Folder %'] || null;
    this.onAirCompleted = data['OnAir Complete'] || null;
    this.onAirCompletedPpa = data['OnAir Completed. PPA Date'] || null;
    this.onAirCompletedPercent = data['OnAir %'] || null;
    this.serviceExecuted = data['Servicio Ejecutado'] || null;
    this.serviceExecutedPpa = data['Servicio Ejecutado PPA Date'] || null;
    this.serviceExecutedPercent = data['Servicio Ejecutado %'] || null;
    this.totalTss = data['Total TSS'] || null;
    this.totalCw = data['Total CW'] || null;
    this.totalImp = data['Total IMP'] || null;
  }
}

module.exports = { ReleaseEntity };
