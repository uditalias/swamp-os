module.exports = {
    options:{
        compress: true,
        mangle: true
    },
    dist: {
        files: [{
            expand: true,
            cwd: '<%= path.dist %>/app/scripts/',
            src: '**/*.js',
            dest: '<%= path.dist %>/app/scripts/'
        }]
    }
};