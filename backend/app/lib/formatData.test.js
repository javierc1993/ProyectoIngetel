
const { totalCleanString } = require('./formatData.js');


describe('Unit test: formatData', () => {
  test('Test totalCleanString', async () => {
    const response = totalCleanString(' testé % MORADIA123à / %');
    expect(response).toEqual('testemoradia123a');
  });
  test('Test replace text', async () => {
    const response = totalCleanString(' testé % MORADIA123à / %'.replace(/%/g, 'percent'));
    expect(response).toEqual('testepercentmoradia123apercent');
  });
});