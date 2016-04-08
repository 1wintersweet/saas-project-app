// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require bootstrap-datepicker
//which requires all js files from assets/javascript path
//= require_tree .

//http://guides.rubyonrails.org/asset_pipeline.html

//In JavaScript files, Sprockets directives begin with //=. In the above case,
// the file is using the require and the require_tree directives. The require directive 
//is used to tell Sprockets the files you wish to require. Here, you are requiring the riles jquery.js and
// jquery_ujs.js that are available somewhere in the search path for Sprockets. You need not supply the extensions explicitly.
// Sprockets assumes you are requiring a .js file when done from within a .js file.

//The require_tree directive tells Sprockets to recursively include all JavaScript files in the
// specified directory into the output. These paths must be specified relative to the manifest file.
// You can also use the require_directory directive which includes all JavaScript files only in the 
//directory specified, without recursion.
