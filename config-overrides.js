const path = require('path');

module.exports = function override(config, env) {
  // Ensure correct paths
  config.resolve = {
    ...config.resolve,
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  };
  
  return config;
};