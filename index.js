#!/usr/bin/env node

var Repo = require( "git-tools" );
var repo = new Repo( "." );
var open = require("open");
var URL = require('url-parse');

repo.currentBranch(function( error, branch ) {

  repo.remotes(function( error, remotes ) {

    var url = new URL(remotes[0].url);
    console.log(url.pathname);
    var username = url.pathname.split('/')[1];
    var repoName = url.pathname.split('/')[2].split('.')[0];

    url.set('protocol', 'https:');
    url.set('pathname', '/'+username+'/'+repoName+'/tree/'+branch);
    open(url.toString());
  });
});
