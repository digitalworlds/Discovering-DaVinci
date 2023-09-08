
test('creates new objectives entry for user', async () => {
  const Objectives = require('../models/Objectives')
  let err = await Objectives.createNewObjectivesEntry('squits')
  expect(err).toBe('');
})

test('get new objectives entry for user', async () => {
  const Objectives = require('../models/Objectives')
  let err = await Objectives.createNewObjectivesEntry('squits')
  expect(err).toBe('');
})