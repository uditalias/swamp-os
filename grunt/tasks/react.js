module.exports = {
    files: {
        expand: true,
        cmd: '<%= path.app %>/scripts/',
        src: ['<%= path.app %>/scripts/**/{,*/}*.jsx'],
        dest: '<%= path.dist %>/',
        ext: '.js'
    }
};