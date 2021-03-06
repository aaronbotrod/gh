#!/usr/bin/env node

var Repo = require( "git-tools" );
var repo = new Repo( "." );
var open = require("open");
var URL = require('url-parse');
var commandLineArgs = require('command-line-args');

var cla = new commandLineArgs([{ name: 'pr_branch', type: String, defaultOption: true }, { name: 'debug', type: Boolean, alias: 'd', defaultValue : false}]);
repo.currentBranch(function( error, branch ) {

  repo.remotes(function( error, remotes ) {
    var options = cla.parse();
    if(options.debug) {
      console.log('options', options);
    }
    
    var url = new URL(remotes[0].url);
    if(url.auth === 'git') {
      var hostNameAndusername = url.host.split(':');
      var hostName = hostNameAndusername[0];
      var username = hostNameAndusername[1];
      var repoName = url.pathname.split('/')[1].split('.')[0];
      
    } else {
      var username = url.pathname.split('/')[1];
      var repoName = url.pathname.split('/')[2].split('.')[0];
      var hostName = url.host;
    }

    url.set('protocol', 'https:');
    url.set('hostname', hostName);
    if(options.pr_branch) {
      url.set('pathname', '/'+username+'/'+repoName+'/compare/'+options.pr_branch+"..."+branch);
    } else {
      url.set('pathname', '/'+username+'/'+repoName+'/tree/'+branch);
    }
    

    console.log("Openning "+url.toString());
    if(!options.debug) {
      open(url.toString());  
    }
    
  
    });
});
