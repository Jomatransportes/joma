const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const phoneFormatFilter = require('./src/filters/phone-format-filter.js');

const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

const {pluginPrismic, definePrismicPluginOptions} = require('eleventy-plugin-prismic');

require('dotenv').config();
const PRISMIC_URI = process.env.PRISMIC_URI;

const prismicPluginOptions = definePrismicPluginOptions({
  endpoint: PRISMIC_URI,
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

  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Pass through fonts and images
  config.addPassthroughCopy('./src/fonts');
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
