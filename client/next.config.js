module.exports = {
  webpack: (config) => {
    config.watchOptions.poll = 300; // Note: Update files in every 300ms. If still doesn't reflact the updates, manually delete the pod and will be recreated with the latest changes by the depl.
    return config;
  }
};
