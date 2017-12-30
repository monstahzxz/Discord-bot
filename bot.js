var Discordie = require("discordie");
var Events = Discordie.Events;
 
var client = new Discordie();
 
client.connect({ token: "Mzk1OTUxNTEyNzY3MTY4NTE0.DSaZpA.Gvx79_yIP0BCKCoMlgEf6b91bUE" });
 

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});
 
client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  var flag=1;
  if (e.message.content == "whos dank?")
    e.message.channel.sendMessage("zorin is dank");
  




  else if(e.message.content=="wtf"||e.message.content=="fuck"||e.message.content=="fuck off"||e.message.content=="stfu")
  	e.message.channel.sendMessage("no cursing pls");
  




  else if(e.message.content[0]==';')
  {
  	var troll=";;play"
    for(var i=0;i<6;++i)
    	if(e.message.content[i]!=troll[i])
    		flag=0;
    if(flag)
     e.message.channel.sendMessage("shitty song selection i should say");	
  }
  




  else if(e.message.content[0]>='0'&&e.message.content[0]<='9')
  {
  	var p=1,q=0,r=1;
  	var x=0,y=0,co=0,res=0;
  	for(var i=0;i<e.message.content.length;++i)
  	{
  		if(e.message.content[i].isLetter)
  			p=0;
  		else if(e.message.content[i]>='0'&&e.message.content[i]<='9')
  			q=1;
  		else if(!(e.message.content[i]=='+'||e.message.content[i]=='-'||e.message.content[i]=='/'||e.message.content[i]=='*'))
            r=0;
  	}
    if(p*r*q)
    {
    	for(var i=0;i<e.message.content.length;++i)
    	{   
    		if(e.message.content[i]>='0'&&e.message.content[i]<='9'&&co===0)
                  x=x*10+(e.message.content[i].charCodeAt(0)-48);
            else if(e.message.content[i]>='0'&&e.message.content[i]<='9'&&co==1)
            	  y=y*10+(e.message.content[i].charCodeAt(0)-48);
            else if(e.message.content[i]=='+'||e.message.content[i]=='-'||e.message.content[i]=='/'||e.message.content[i]=='*')
             { oper=e.message.content[i];++co; }	    
    	}
    if(oper=='+')
    	{ res=x+y; e.message.channel.sendMessage("quickmafs " + res); }
    if(oper=='-')
    	{ res=x-y; e.message.channel.sendMessage("quickmafs " + res); }
    if(oper=='/')
    	{ res=x/y; e.message.channel.sendMessage("quickmafs " + res); }
    if(oper=='*')
    	{ res=x*y; e.message.channel.sendMessage("quickmafs " + res); }
    }
  }
  


  else if(e.message.content=="<@395951512767168514>")
  {
  	e.message.channel.sendMessage("Sup, im a mathematical genius\nHit me up with some simple stuff like 1+1\nOr ask me the time with '..time'");
  }
  var id="<@395951512767168514>"
  for(var i=0;i<id.length;++i)
  {
  	if(e.message.content[i]!=id[i])
  		flag=0;
  }	
  	if(flag&&e.message.content.length>21)
  	{
      e.message.channel.sendMessage("sorry, i dont speak inglis, pls ask my good frand zorin");
  	}
  




  else if(e.message.content=="..time")
  	 {
  	   var time=new Date();
  	   e.message.channel.sendMessage(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
  	 }

  /*var opt = {
            host: "api.twitch.tv",
            path: "/kraken/streams/shroud",
            headers: {
                "Client-ID": "elhkr6lyifkxd5r425s18wh3hqhrri",
                Accept: "application/vnd.twitchtv.v3+json"
            }
        };*/
  /*var twt;
  var https=require('https');
  var url="https://api.twitch.tv/kraken/streams/'+videoId+'?client_id=elhkr6lyifkxd5r425s18wh3hqhrri&callback=?";
 if(e.message.content=="do it")
  { e.message.channel.sendMessage("im in");
  	https.get(url,(res)=>{
  	var body='';
  	res.on('data',(chunk)=>{
  		body+=chunk;
  	});
  	res.on('end',function(){
  		twt=JSON.parse(body);
  	});
  	e.message.channel.sendMessage(res.stream);
  	if(res.stream==null)
  		e.message.channel.sendMessage("OFFLINE");
  	else
  		e.message.channel.sendMessage("ONLINE");
   });
  }*/
  var request=require('request');
  var url="https://api.twitch.tv/kraken/streams/thewarowl";

  if(e.message.content=="do it")
  {
     request.get({
    url: url,
    json: true,
    headers: {"Client-ID":"elhkr6lyifkxd5r425s18wh3hqhrri"}
  },(err,res,data)=>{
  	if(data.stream!==null)
  		e.message.channel.sendMessage("ONLINE");
  	else
  		e.message.channel.sendMessage("OFFLINE");
  });
  }	

});
