module.exports = function(grunt) {
   // Project configuration.
   grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'),
       uglify: {
           build: {
               src: 'client/client.js',
               dest: 'server/public/assets/scripts/client.min.js'
           }
       },
       copy: {
           main: {
             files: [
               {
                 expand: true,
                 cwd: "node_modules/",
                 src: [
                     "angular/angular.min.js",
                     "angular/angular.min.js.map",
                     "angular/angular-csp.css"
                 ],
                 "dest": "server/public/vendor/"
               },
               {
                 expand: true,
                 cwd: "client",
                 src: "style.css",
                 "dest": "server/public/assets/style"
               }
             ]
           }
       }
   });

   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   // Default task(s).
   grunt.registerTask('default', ['copy', 'uglify']);

};
