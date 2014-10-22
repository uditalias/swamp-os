module.exports = {
    dist: {
        expand: true,
        cwd: '<%= path.dist %>/',
        src: ['**/*.css', '!**/*.min.css'],
        dest: '<%= path.dist %>/'
    }
};