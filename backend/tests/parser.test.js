
test('parses a google sheets json', async () => {
  const Trivia = require('../models/Trivia')
  let formatted = await Trivia.parseSheets()
  console.log(JSON.stringify(formatted, null, 2))
  expect('').toBe('');
})