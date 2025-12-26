module.exports = {
  apps: [
    {
      name: "api",
      script: "Server.js",

      // Node environment
      env: {
        NODE_ENV: "development",
      },

      env_production: {
        NODE_ENV: "production",
      },

      // PM2 behavior
      instances: 1,            // keep 1 for now (cluster later)
      exec_mode: "fork",       // cluster not needed yet
      autorestart: true,
      watch: false,

      // Logging
      error_file: "/var/log/api-error.log",
      out_file: "/var/log/api-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",

      // Graceful restarts
      kill_timeout: 3000,
      restart_delay: 3000,
    },
  ],
};
