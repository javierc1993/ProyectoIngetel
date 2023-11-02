

class ReleaseDocEntity {
  constructor (data) {
    this.proyect = data.proyect || null;
    this.woName = data.woname || null;
    this.vendorSapName = data.vendorsapname || null;
    this.poNumber = data.sponumber || null;
    this.iaDate = data.iadate || null;
    this.grDate = data.grdate || null;
    this.sgrNumber = data.servicesgoodreceiptnumbersgr || null;
    this.rfeNotified = data.rfenotifiedbypartnerdate || null;
    this.rfeNotifiedPpa = data.rfenotifiedbypartnerppadate || null;
    this.rfeNotifiedPercent = data.rfenotifiedbypartnerpercent || null;
    this.tssrClient = data.tssrenviadoalcliente || null;
    this.tssrClientPpa = data.tssrenviadoalclienteppadate || null;
    this.tssrClientPercent = data.tssrenviadoalclientepercent || null;
    this.tssrApproved = data.is51tssrapproved || null;
    this.tssrApprovedPpa = data.is51tssrapprovedppadate || null;
    this.tssrApprovedPercent = data.is51tssrapprovedpercent || null;
    this.executeCw = data.executecwregfotograficodate || null;
    this.executeCwPpa = data.executecwregfotograficoppadate || null;
    this.executeCwPercent = data.executecwregfotograficopercent || null;
    this.finalDocument = data.docfinalokdate || null;
    this.finalDocumentPpa = data.docfinalokppadate || null;
    this.finalDocumentPercent = data.docfinalokpartnerpercent || null;
    this.instalation = data.installationdocokdate || null;
    this.instalationPpa = data.docinstallationppadate || null;
    this.instalationPercent = data.docinstallationpercent || null;
    this.integrationDocument = data.integrationdocokdate || null;
    this.integrationDocumentPpa = data.docintegrationppadate || null;
    this.integrationDocumentPercent = data.docintegrationpercent || null;
    this.siteFolderApproved = data.sitefolderapprovedbycustdate || null;
    this.siteFolderApprovedPpa = data.sitefolderapprovedbycustppadate || null;
    this.siteFolderApprovedPercent = data.sitefolderpercent || null;
    this.onAirCompleted = data.onaircomplete || null;
    this.onAirCompletedPpa = data.onaircompleteppadate || null;
    this.onAirCompletedPercent = data.onairpercent || null;
    this.serviceExecuted = data.servicioejecutado || null;
    this.serviceExecutedPpa = data.servicioejecutadoppadate || null;
    this.serviceExecutedPercent = data.servicioejecutadopercent || 0;
    this.totalTss = data.totaltss || 0;
    this.totalCw = data.totalcw || 0;
    this.totalImp = data.totalimp || 0;
  }
}

module.exports = { ReleaseDocEntity };
