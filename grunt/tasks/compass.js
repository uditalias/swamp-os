module.exports = {
    dev: {
        options: {
            sassDir: '<%= path.app %>/styles/scss',
            cssDir: '<%= path.app %>/styles/',
            specify: ['<%= path.app %>/styles/scss/main.scss', '<%= path.app %>/styles/scss/plugins.scss']
        }
    },
    dist: {
        options: {
            sassDir: '<%= path.app %>/styles/scss',
            cssDir: '<%= path.app %>/styles/',
            specify: ['<%= path.app %>/styles/scss/main.scss', '<%= path.app %>/styles/scss/plugins.scss']
        }
    },
    server: {
        options: {
            debugInfo: true
        }
    }
};