module.exports = {
    apps: [
      {
        name: 'zantaku',
        script: 'npx serve',
        args: 'serve dist -l 8080 --single',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '256M',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  