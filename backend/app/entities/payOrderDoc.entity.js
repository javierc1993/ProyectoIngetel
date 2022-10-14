const { excelDateToJSDate } = require('../lib/utils')

class PayOrderDocEntity {
  constructor (data) {
    this.proyect = data['Proyecto '] || null;
    this.reference = data['PO'] || null;
    this.scenery = data['Escenario '] || null;
    this.value = data[' VALOR PO '] || null;
    this.band = data['Banda'] || null;
    this.Sites = {
      name: data['SITE NAME'] || null,
      smp: data['SMP'] || null,
      region: data['Regional'] || null
    };
    this.Instalations = {
      date: data['instalacion'] ? excelDateToJSDate(data['instalacion']) : null
    };
    this.Integrations = {
      date: data['Fecha de Integracion'] ? excelDateToJSDate(data['Fecha de Integracion']) : null
    };
    this.MosHws = {
      date: data['mos_HW'] ? excelDateToJSDate(data['mos_HW']) : null
    };
    this.OnAirs = {
      date: data['ON AIR'] || null
    };
    this.Leaders = {
      name: data['Lider '] || null
    };
  }
}
module.exports = { PayOrderDocEntity };
