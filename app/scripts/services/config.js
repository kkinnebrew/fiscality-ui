module.exports = {
  BASE_URL: {
    PROD: 'https://fiscality-api.herokuapp.com',
    DEV: 'http://localhost:9000'
  },
  ENV: 'PROD',
  getBaseUrl: function() {
    return this.BASE_URL[this.ENV];
  }
};