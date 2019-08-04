var Discord = require("discord.js");
var fs=require("fs");
var ytdl=require("ytdl-core");
var request=require('request');

var client = new Discord.Client();


  var surl='';
  var url="https://api.twitch.tv/kraken/streams/";
  var twit="..twitch",tid='';
  var servers={};
  var id;
  var squeue=[];

  var yt_api_key=fs.readFileSync("ytkey.txt","utf8");
  var token=fs.readFileSync("token.txt", "utf8");

 
 client.login(token);





 function playsong(connection, message) {
    //server=servers[message.guild.id];	
    //console.log(server.queue);
    server.dispatcher=connection.playStream(ytdl(server.queue[0],{filter:"audioonly"}));
    server.dispatcher.on("end",function(){
    	console.log("over");
    	server.queue.shift();
    	squeue.shift();
    	if(server.queue[0])
    		playsong(connection,message);
     
    	else
    		connection.disconnect();
    	});

 }



function searchSong(query,callback) {
	var result;
        request("https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&q="+query+"&key=AIzaSyBd8Xmi2tKXhS0C7Gt_-HVVcXvBrf9eLiw",(err,res,data)=>{
        	 result = JSON.parse(data);
        	 squeue.push(result.items[0].snippet.title);
        	callback(result.items[0].id.videoId);
        });
}


client.on("ready", e => {
  console.log("Connected as: " + client.user);
});
 
client.on("message", e => {
	//console.log(e);
  var flag=1;
  var tflag=1;

  url="https://api.twitch.tv/kraken/streams/";
  tid='';




  if (e.content == "whos dank?")
    e.channel.send("zorin is dank");
  







else if(e.content.split(" ")[0]=="..play"&&e.member.voiceChannel)
	{	
	    if(!servers[e.guild.id]) {
	    	servers[e.guild.id]={
	    	queue: []
	    };	
	    server=servers[e.guild.id];}
	    if(server.queue[0])
	    {
	    	 surl=e.content.split(" ").slice(1).join(" ");
	    	 if(surl.indexOf("https://www.youtube.com/watch?v=")==-1)
	    	 {
	    	 searchSong(surl,function(id){
            	    surl="https://www.youtube.com/watch?v="+id;	
	           server.queue.push(surl);
	    	 });
	    	 }
	    	else
	    	{
	    	    searchSong(surl,function(id){		
	    	    server.queue.push(surl);
	    	});
	    	}
	    }
	    else
           {	
            surl=e.content.split(" ").slice(1).join(" ");
            if(surl.indexOf("https://www.youtube.com/watch?v=")==-1)
            {	
            searchSong(surl,function(id){
	    	 surl="https://www.youtube.com/watch?v="+id;	
	        server.queue.push(surl);
	        e.member.voiceChannel.join().then(function(connection) {
	     	 playsong(connection,e);
	     });	
	    	 });
    	     }
    	     else
    	     {
    	     	searchSong(surl,function(id){
    	      	server.queue.push(surl);
	        e.member.voiceChannel.join().then(function(connection) {
	     	 playsong(connection,e);	
    	     });
	 });
	     }

          }
       }   
else if(e.content=="..queue"&&e.member.voiceChannel)	
{	
	      var songq=[];
	      for(var i=0;i<squeue.length;++i)
	      		songq.push((i+1)+". "+squeue[i]);
	      e.channel.send(songq);
}	      

else if(e.content=="..skip"&&e.member.voiceChannel)
{
	if(server.dispatcher)
		server.dispatcher.end();
}

else if(e.content=="..stop"&&e.member.voiceChannel)
   {
   	if(server.queue[0])
   		{
   			e.channel.send("`Emptying queue!!`");
   			for(var i=0;i<server.queue.length;++i)
   			   server.queue.shift();
   		       e.member.voiceChannel.leave();
   		       squeue=[];
   		}
   	else
   		e.channel.send("`Queue is already empty!!!`");       
   }     
else if(e.content=="..pause"&&e.member.voiceChannel)
 {
 	e.channel.send("Player has been `paused`");
 	server.dispatcher.pause();
 }
else if(e.content=="..unpause"&&e.member.voiceChannel)
{
	e.channel.send("Player has been `unpaused`");
	server.dispatcher.resume();
} 






  else if(e.content[0]==';'&&e.content.length>6)
  {
  	var troll=";;play"
    for(var i=0;i<6;++i)
    	if(e.content[i]!=troll[i])
    		flag=0;
    if(flag)
     e.channel.send("shitty song selection i should say");	
  }
  





  else if(e.content[0]>='0'&&e.content[0]<='9')
  {
  	var p=1,q=0,r=1,t=0;
  	var x=0,y=0,co=0,res=0;
  	for(var i=0;i<e.content.length;++i)
  	{
  		if(e.content[i].isLetter)
  			{ p=0; break; }
  		else if(e.content[i]>='0'&&e.content[i]<='9')
  			q=1;
         	else if(e.content[i]=='+'||e.content[i]=='-'||e.content[i]=='/'||e.content[i]=='*')
         		t=1;
         	else if(!(e.content[i]=='+'||e.content[i]=='-'||e.content[i]=='/'||e.content[i]=='*'))
                	r=0;
  	}
    if(p*r*q*t)
    {
    	for(var i=0;i<e.content.length;++i)
    	{   
    		if(e.content[i]>='0'&&e.content[i]<='9'&&co===0)
                  x=x*10+(e.content[i].charCodeAt(0)-48);
            else if(e.content[i]>='0'&&e.content[i]<='9'&&co==1)
            	  y=y*10+(e.content[i].charCodeAt(0)-48);
            else if(e.content[i]=='+'||e.content[i]=='-'||e.content[i]=='/'||e.content[i]=='*')
             { oper=e.content[i];++co; }	    
    	}
    if(oper=='+')
    	{ res=x+y; e.channel.send("quickmafs " + res); }
    if(oper=='-')
    	{ res=x-y; e.channel.send("quickmafs " + res); }
    if(oper=='/')
    	{ res=x/y; e.channel.send("quickmafs " + res); }
    if(oper=='*')
    	{ res=x*y; e.channel.send("quickmafs " + res); }
    }
  }
  





else if(e.content=="is pubg an esport?")
	e.channel.send("lol u kidding?");





  else if(e.content=="<@395951512767168514>")
  {
  	//e.channel.send("Adhu can suck my virtual dick",{"tts":true});
  	e.channel.send("I can sing :3 do ..play <utoob url or name of song>\nI do quickmafs too (simple mafs pls)\nYou can ask me the time too! Do '..time'\nkthnxbye");
  }
  







  else if(e.content=="..time")
  	 {
  	   var time=new Date();
  	   e.channel.send(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
  	 }







  else if(e.content[0]==".")
  { 
      for(var i=0;i<8;++i)
      	if(e.content[i]!==twit[i])
      		tflag=0;
      if(tflag)
      {
       for(i=9;i<e.content.length;++i)
        	 {
        	 	url+=e.content[i];	
        	 	tid+=e.content[i];
        	 }		
       request.get({
       url: url,
       json: true,
       headers: {"Client-ID":"elhkr6lyifkxd5r425s18wh3hqhrri"}
       },(err,res,data)=>{
  	  if(data.stream!==null)
  	 	{
  	 		e.channel.send("LIVE!!");
  	 		e.channel.send("https://www.twitch.tv/"+tid);  	 	}	
  	  else
   		e.channel.send(tid + " is" +" OFFLINE :(");
      });
     }
  }
 








 else if(e.author.id=="156458054739558402"&&e.content=="hi goodboi")
 	e.channel.send("beeeeeef <3");



 else if(e.author.id=="263932122291634176"&&e.content=="hi goodboi")
       {
       	e.channel.send("SKY IS HERE FOR U <3");
       	e.channel.sendFile("lab.jpg");
       }

 







 else if(e.content=="..quote")
   {
   	 request.get({
       url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
       json: true,
       },(err,res,data)=>{
  	  e.channel.send(data[0].content);
      });
   }	

 });
