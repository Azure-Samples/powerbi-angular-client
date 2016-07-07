module.exports = function() {
    const config = {
        allJs: ['app/**/*.js'],
        templates: ['app/**/*template.html'],
        htmlPage: 'app/index.html',
        distFolder: 'dist/',

        angularTemplateCache: {
            templateHeader: 'export default function($templateCache) {',
            templateBody: '$templateCache.put("<%= url %>","<%= contents %>");',
            templateFooter: '};'
        }
    };

    return config;
};