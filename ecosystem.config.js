module.exports = {
  apps: [
    {
      script: "npm start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "103.160.89.20",
      ref: "origin/main",
      repo: "git@github.com:TonyLeeIT/Booking_Dates_Hanbiro.git",
      path: "/var/www/html",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "StrictHostKeyChecking=no",
    },
  },
};
