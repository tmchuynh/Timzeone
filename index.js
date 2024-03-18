// Import necessary packages
require('dotenv').config();
const moment = require('moment-timezone');
const chalk = require('chalk');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Destructure environment variables
const { TIMEZONE, FORMAT, CHANNEL_ID, UPDATE_INTERVAL, BOT_TOKEN } = process.env;

// 'ready' event
client.once('ready', () => {
  // Initialize time
  const timeNow = moment().tz(TIMEZONE).format(FORMAT);
  // Define clockChannel
  const clockChannel = client.channels.cache.get(CHANNEL_ID);
  // Initial update
  clockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
    .catch(console.error);
  // Set the interval
  setInterval(() => {
    const timeNowUpdate = moment().tz(TIMEZONE).format(FORMAT);
    clockChannel.edit({ name: `🕒 ${timeNowUpdate}` }, 'Clock update')
      .catch(console.error);
  }, UPDATE_INTERVAL);
  // Log when ready
  console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("MMMM DD YYYY, hh:mm:ss A")}`);
});

// Log in
client.login(BOT_TOKEN);
