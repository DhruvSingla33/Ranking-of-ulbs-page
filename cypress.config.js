const { defineConfig } = require("cypress");
const dotenv = require('dotenv');

dotenv.config();


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    downloadsFolder: 'cypress/downloads'
  },
  env: {
    password: process.env.PASSWORD,
    code: process.env.CODE,
    state_id:process.env.STATE_ID,
    state_password:process.env.STATE_PASSWORD,
    MoHUA_id:process.env.MoHUA_ID,
    MoHUA_password:process.env.MoHUA_PASSWORD,
    ULB_NAME:process.env.ULB_NAME,
  },
});
