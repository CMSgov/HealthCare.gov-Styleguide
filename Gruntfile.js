module.exports = function(grunt) {
  	grunt.initConfig({
	  	pkg: grunt.file.readJSON('package.json'),
	    less: {
	    	default:{
	    		options: {
	      		
		    	},
		    	files: {
		      		"css/style.css": "_includes/css/all.less", // destination file and source file
		      		"assets-components/css/style.css": "assets-components/css/all.less", // destination file and source file
		    	}
	    	}
	    }
  	});

  	grunt.loadNpmTasks('grunt-contrib-less');

  	grunt.registerTask('default', ['less']);
};