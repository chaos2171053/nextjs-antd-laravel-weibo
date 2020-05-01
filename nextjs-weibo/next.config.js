const withSass = require('@zeit/next-sass')
const config = {
    env: {
        API_URL: process.env.API_URL
    }
}
const sass = withSass({
    cssModules: true,
})
module.exports = {
    ...config,
    ...sass,
}