// services.test.js
const { getServices } = require('./services');

test('should return list of services', () => {
  expect(getServices()).toContain('Hébergement Cloud');
});
