const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const phoneFormatFilter = require('./src/filters/phone-format-filter.js');

const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

const {pluginPrismic, definePrismicPluginOptions} = require('eleventy-plugin-prismic');

const prismicPluginOptions = definePrismicPluginOptions({
  endpoint: 'jomatransportes',
  singletons: ['home', 'sobre'],
  shortcodesNamespace: 'prismic'
});

module.exports = config => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('phoneFormatter', phoneFormatFilter);

  // Plugins
  config.addPlugin(rssPlugin);
  config.addPlugin(pluginPrismic, prismicPluginOptions);
  config.prismicPluginOptions = prismicPluginOptions;

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Pass through fonts and images
  config.addPassthroughCopy('./src/fonts');
  config.addPassthroughCopy('./src/css');
  config.addPassthroughCopy('./src/images');
  config.addPassthroughCopy('./src/favicon.ico');

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
