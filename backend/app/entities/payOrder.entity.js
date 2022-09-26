

class PayOrderEntity {
  constructor (data) {
    reference = data['PO'] || null;
    scenery = data['Escenario '] || null;
    value = data[' VALOR PO '] || null;
    band = data['Banda'] || null;
    Sites = {
      name: po['SITE NAME'] || null,
      smp: po['SMP'] || null,
      region: po['Regional'] || null,
    };
    Instalations = {
      date: po['instalacion'] ? new Date(po['instalacion'] + ' 00:00:00') : null
    };
    Integrations = {
      date: po['Fecha de Integracion'] ? new Date(po['Fecha de Integracion'] + ' 00:00:00') : null
    };
    MosHws = {
      date: po['mos_HW'] ? new Date(po['mos_HW'] + ' 00:00:00') : null
    };
    OnAirs = {
      date: po['ON AIR'] || null
    };
    Leaders = {
      name: po['Lider '] || null
    };
  }
}
module.exports = { PayOrderEntity };
