const app = require('./config/app'),
  cron = require('node-cron'),
  Power = require('./models/Power'),
  Creator = require('./models/Creator'),
  Objectives = require('./models/Objectives'),
  sockets = require('./config/sockets');

// let options = {timezone: "America/New_York"}

// Reset all users' daily objectives every day at 3 AM EST
cron.schedule('0 0 3 * * * *', async () => {
  await Objectives.resetAllDailyObjectives()
    .catch(err => {
      console.log(err)
    })
});

// Update all users' coins by 100 every hour
cron.schedule('0 0 * * * *', async () => {
  await Power.updateAll()
  sockets.broadcast('hourlyCoinUpdate')
})

// Reset weekly objectives every tuesday at 3 AM EST
cron.schedule('0 0 3 * * TUE', async () => {
  await Objectives.resetAllWeeklyObjectives()
    .catch(err => {
      console.log(err)
    })
});

// Start listening for interactions on the blockchain
Creator.startProcessor()

app.start()