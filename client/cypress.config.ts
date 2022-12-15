import { defineConfig } from "cypress";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    baseUrl: process.env.REACT_APP_CLIENT_URL,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
    googleRefreshToken: process.env.REACT_APP_GOOGLE_CLIENT_REFRESH_TOKEN,
  },
});
