const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/coding/jamStackCrash/test/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/coding/jamStackCrash/test/src/pages/index.js")))
}

