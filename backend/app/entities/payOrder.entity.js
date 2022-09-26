

class PayOrderEntity {
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
      date: data['instalacion'] ? new Date(data['instalacion'] + ' 00:00:00') : null
    };
    this.Integrations = {
      date: data['Fecha de Integracion'] ? new Date(data['Fecha de Integracion'] + ' 00:00:00') : null
    };
    this.MosHws = {
      date: data['mos_HW'] ? new Date(data['mos_HW'] + ' 00:00:00') : null
    };
    this.OnAirs = {
      date: data['ON AIR'] || null
    };
    this.Leaders = {
      name: data['Lider '] || null
    };
  }
}
module.exports = { PayOrderEntity };
