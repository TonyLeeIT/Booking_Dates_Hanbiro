module.exports = {
  apps: [
    {
      script: "npm start",
      env: {
        NODE_ENV: "production",
        PORT: 3333,
      },
    },
  ],

  deploy: {
    production: {
      key: "private.key",
      user: "root",
      host: "103.160.89.20",
      ref: "origin/main",
      repo: "https://github.com/TonyLeeIT/Booking_Dates_Hanbiro",
      path: "/var/www/html",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};
