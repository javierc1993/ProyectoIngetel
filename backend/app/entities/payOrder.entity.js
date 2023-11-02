const { excelDateToJSDate } = require('../lib/utils')

class PayOrderEntity {
  constructor (data) {
    this.proyect = data.proyecto || null;
    this.reference = data.po || null;
    this.scenery = data.escenario || null;
    this.value = data.valorpo || null;
    this.band = data.banda || null;
    this.poDate = data.produccion ? excelDateToJSDate(data.produccion) : null
    this.Sites = {
      name: data.sitename|| null,
      smp: data.smp || null,
      region: data.regional || null
    };
    this.Instalations = {
      date: data.instalacion ? excelDateToJSDate(data.instalacion) : null
    };
    this.Integrations = {
      date: data.fechadeinstalacion ? excelDateToJSDate(data.fechadeinstalacion) : null
    };
    this.MosHws = {
      date: data.moshw ? excelDateToJSDate(data.moshw) : null
    };
    this.OnAirs = {
      date: data.onair|| null
    };
    this.Leaders = {
      name: data.lider || null
    };
  }
}
module.exports = { PayOrderEntity };
