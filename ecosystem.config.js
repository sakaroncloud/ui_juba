module.exports = {
  apps: [
    {
      name: "frontend", // Name of your frontend app
      script: "npm", // The script to run
      args: "run start", // The command to start the frontend (e.g., "next start --port 3000")
      cwd: "./apps/frontend", // Adjust this to the path of your frontend app within Turborepo
      env: {
        NODE_ENV: "production",
      },
      instances: 2, // Number of instances to run (adjust as needed)
      autorestart: true, // Restart the app if it crashes
      watch: false, // Disable file watching in production
      max_memory_restart: "1G", // Restart app if memory exceeds 1GB
      log_file: "./logs/frontend.log", // Log file location
    },
    {
      name: "cms", // Name of your CMS app
      script: "npm", // The script to run
      args: "run start", // The command to start the CMS (e.g., "next start --port 3001")
      cwd: "./apps/cms", // Adjust this to the path of your CMS app within Turborepo
      env: {
        NODE_ENV: "production",
      },
      instances: 2, // Number of instances to run (adjust as needed)
      autorestart: true, // Restart the app if it crashes
      watch: false, // Disable file watching in production
      max_memory_restart: "1G", // Restart app if memory exceeds 1GB
      log_file: "./logs/cms.log", // Log file location
    },
  ],
};
