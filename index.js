#!/usr/bin/env node

var Repo = require( "git-tools" );
var repo = new Repo( "." );
var open = require("open");
var URL = require('url-parse');

repo.currentBranch(function( error, branch ) {

  repo.remotes(function( error, remotes ) {

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

    url.set('pathname', '/'+username+'/'+repoName+'/tree/'+branch);
    url.set('protocol', 'https:');
    url.set('hostname', hostName);
    
    open(url.toString());
  
    });
});

