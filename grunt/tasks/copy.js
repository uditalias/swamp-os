module.exports = {
    dist: {
        files: [
            {
                expand: true,
                dot: true,
                cwd: '<%= path.app %>',
                dest: '<%= path.dist %>/app',
                src: [
                    '**/*.html',
                    '**/*.js',
                    '**/*.json',
                    '**/*.css',
                    'lib/bootstrap/dist/**/*.map',
                    'assets/**/*'
                ]
            }
        ]
    }
};