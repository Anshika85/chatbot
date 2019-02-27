var socket=require('socket.io');
var express=require('express');
var app=express();
var server=require('http').createServer(app);
var io=socket.listen(server);
var apiai=require('apiai');
var app1= apiai("");

server.listen(100);
console.log("server running");

app.get('/',function(req,res){
	res.sendFile( __dirname + '/web.html');
});


io.on('connection',function(socket){

	socket.on('message',function(data){

          var request = app1.textRequest(data,{
          	sessionId:'chatbot-2d722'
          });
         
        request.on('response', function(response) {
        var x=response.result.fulfillment.speech;
        console.log(x);
        
         socket.emit('fromserver',x);
        }); 
       
        request.on('error', function(error) {
        console.log(error);
        });
 
        request.end();



        
      
	});

});