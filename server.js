//Libraries used in project
const path = require('path'),
      fs = require('fs'),
      http = require('http');
var {exec} = require('child_process');

var {SERVEresource} = require('./bin/vapi-resources.js');

const PORT = 4000; //port for local host

var server = http.createServer();

server.on('request',(req,res)=>{
  console.log('request');
  let data = '';
  let rpak = {
    success:false,
    msg:'Request Resource'
  }
  SERVEresource(req.url,res).then(
    answer=>{}
  ).catch(err=>{console.log(err)})
});

server.listen(PORT,()=>{console.log('Server Listening: ',PORT);});
