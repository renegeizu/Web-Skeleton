const getYarnWorkspaces = require('get-yarn-workspaces');
const { override, babelInclude, addPostcssPlugins } = require('customize-cra');

module.exports = override(
  babelInclude(getYarnWorkspaces()),
  addPostcssPlugins([require('tailwindcss'), require('autoprefixer')]),
);
