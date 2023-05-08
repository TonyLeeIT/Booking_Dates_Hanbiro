module.exports = {
  apps: [
    {
      script: "npm start",
      watch: ".",
    },
  ],

  deploy: {
    production: {
      key: "E:/info_api/ssh/private.key",
      user: "root",
      host: "103.160.89.20",
      ref: "origin/main",
      repo: "https://github.com/TonyLeeIT/Booking_Dates_Hanbiro.git",
      path: "/var/www/html",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install --legacy-peer-deps && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
