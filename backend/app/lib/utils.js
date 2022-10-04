'use strict';


function excelDateToJSDate (excelDate) {
  try {
    // function excelDateToJSDate (serial) {
    // var utc_days = Math.floor(serial - 25569);
    // var utc_value = utc_days * 86400;
    // var date_info = new Date(utc_value * 1000);

    // var fractional_day = serial - Math.floor(serial) + 0.0000001;

    // var total_seconds = Math.floor(86400 * fractional_day);

    // var seconds = total_seconds % 60;

    // total_seconds -= seconds;

    // var hours = Math.floor(total_seconds / (60 * 60));
    // var minutes = Math.floor(total_seconds / 60) % 60;

    // return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    var date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
    var converted_date = date.toISOString().split('T')[0];
    return converted_date;

  } catch (error) {
    console.log(error);
    return null;
  }

}

const filters = {
  date: (item, filter) => {
    const { init, until, fieldName } = filter;
    let search = {};
    if (init || until) {
      if (init && until) {
        search = { [Op.gte]: init, [Op.lte]: until };
      } else {
        if (init) search = { [Op.gte]: init };
        if (until) search = { [Op.lte]: until };
      }
      item.where = {};
      item.where[fieldName] = search;
      return item;
    }
    return item;
  },

  number: (item, filter) => {
    const { data, operator, fieldName } = filter
    if (data) {
      item.where = {};
      let search = data;
      if (operator == 'top') search = { [Op.gte]: data }
      if (operator == 'button') search = { [Op.lte]: data }
      item.where[fieldName] = search;
      return item;
    }
    return item;

  },
  string: (item, filter) => {
    const { data, operator, fieldName } = filter

    if (data) {
      // if (item.as == 'leader') {
      //   item.where = Sequelize.where(Sequelize.fn('concat', Sequelize.col('name'), ' ', Sequelize.col('lastname')), 
      //   {
      //     [Op.like]: `%${data}%`
      //   });
      //   return item;
      // }
      item.where = {};
      let search = data;
      if (operator == 'content') search = { [Op.like]: `%${data}%` }
      if (operator == 'noContent') search = { [Op.notLike]: `%${data}%` }
      item.where[fieldName] = search;
      return item;
    }
    return item;
  }


}



module.exports = {
  excelDateToJSDate,
  filters
}