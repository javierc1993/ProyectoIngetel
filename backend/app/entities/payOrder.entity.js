

class PayOrderEntity {
  constructor (data) {
    this.proyect = data['Proyecto'] || null;
    this.reference = data['PO'] || null;
    this.scenery = data['Escenario '] || null;
    this.value = data[' VALOR PO '] || null;
    this.band = data['Banda'] || null;
    this.Sites = {
      name: po['SITE NAME'] || null,
      smp: po['SMP'] || null,
      region: po['Regional'] || null,
    };
    this.Instalations = {
      date: po['instalacion'] ? new Date(po['instalacion'] + ' 00:00:00') : null
    };
    this.Integrations = {
      date: po['Fecha de Integracion'] ? new Date(po['Fecha de Integracion'] + ' 00:00:00') : null
    };
    this.MosHws = {
      date: po['mos_HW'] ? new Date(po['mos_HW'] + ' 00:00:00') : null
    };
    this.OnAirs = {
      date: po['ON AIR'] || null
    };
    this.Leaders = {
      name: po['Lider '] || null
    };
  }
}
module.exports = { PayOrderEntity };
