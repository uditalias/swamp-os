module.exports = {
    compass: {
        files: [
            "<%= path.app %>/styles/scss/**/{,*/}*.scss",
            "<%= path.app %>/scripts/components/**/{,*/}*.scss"
        ],
        tasks: ["compass:dev"],
        options: {
            event: ['all']
        }
    }
};