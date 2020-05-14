
const withLess = require("@zeit/next-less");
const config = {
    experimental: { scss: true },
    env: {
        API_URL: process.env.API_URL
    }
}
const less = withLess({

});
module.exports = {
    ...config,
    ...less
}