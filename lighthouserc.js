module.exports = {
  ci: {
    collect: {
      url: [
        `${process.env.DEPLOY_URL}`,
        `${process.env.DEPLOY_URL}narratives/water-as-leverage/rise-chennai`,
      ],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
