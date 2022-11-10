'use strict';


function ddmmaaaaTommddaaaa (date ) {
  try {
   const dateArray = date.split('/');
   return [
    dateArray[1],
    dateArray[0],
    dateArray[2]
  ].join('/');

  } catch (error) {
    console.log(error);
    return null;
  }

}


module.exports = {
  ddmmaaaaTommddaaaa
}