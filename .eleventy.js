// imports
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const filterPostDate = require("./src/config/postDate");

module.exports = function (eleventyConfig) {
    // adds the official eleventy navigation plugin for a scalable navigation
    eleventyConfig.addPlugin(pluginEleventyNavigation);

    // passthroughs allow non-template (html, njk) files to be put into /public
    // here, we individually specify what folders are passed through. this prevents sass files from being deployed unnecessarily
    eleventyConfig.addPassthroughCopy("./src/assets/css");
    eleventyConfig.addPassthroughCopy("./src/assets/favicons");
    eleventyConfig.addPassthroughCopy("./src/assets/fonts");
    eleventyConfig.addPassthroughCopy("./src/assets/images");
    eleventyConfig.addPassthroughCopy("./src/assets/js");
    eleventyConfig.addPassthroughCopy("./src/assets/svgs");

    // other important files are passed through. this allows the CMS, redirects, robots.txt and sitemap to be present in the deployed project
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });
    eleventyConfig.addPassthroughCopy({ "./src/sitemap.xml": "/sitemap.xml" });

    // normally, 11ty will render dates on blog posts in full JSDate format (Fri Dec 02 18:00:00 GMT-0600)
    // this filter allows dates to be converted into a normal, locale format. view the docs to learn more (https://moment.github.io/luxon/api-docs/index.html#datetime)
    eleventyConfig.addFilter("postDate", filterPostDate);

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk",
    };
};
