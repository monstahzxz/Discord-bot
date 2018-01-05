var Discord = require("discord.js");
var fs=require("fs");
var ytdl=require("ytdl-core");
var request=require('request');

var client = new Discord.Client();


  var surl='';
  var url="https://api.twitch.tv/kraken/streams/";
  var twit="..twitch",tid='';
  var curse=["wtf","fuck","fuck off","stfu"];
  var servers={};
  var yt_api_key="AIzaSyBd8Xmi2tKXhS0C7Gt_-HVVcXvBrf9eLiw";
  var id;
  var squeue=[];

 client.login( "Mzk1OTUxNTEyNzY3MTY4NTE0.DSaZpA.Gvx79_yIP0BCKCoMlgEf6b91bUE" );



 function playsong(connection, message) {
    //server=servers[message.guild.id];	
    //console.log(server.queue);
    server.dispatcher=connection.playStream(ytdl(server.queue[0],{filter:"audioonly"})); 
    server.dispatcher.on("end",function(){
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
  



  else if(e.content=="wtf"||e.content=="fuck"||e.content=="fuck off"||e.content=="stfu")
  	e.channel.send("no cursing pls");
  







else if(e.content.split(" ")[0]=="..play")
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
else if(e.content=="..queue")		
	      e.channel.send(squeue);

else if(e.content=="..skip")
{
	if(server.dispatcher)
		server.dispatcher.end();
}

else if(e.content=="..stop")
   {
   	if(server.queue[0])
   		{
   			e.channel.send("Emptying queue!!");
   			for(var i=0;i<server.queue.length;++i)
   			   server.queue.shift();
   		       e.member.voiceChannel.leave();
   		       squeue=[];
   		}
   	else
   		e.channel.send("Queue is already empty!!!");       
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
  	var p=1,q=0,r=1;
  	var x=0,y=0,co=0,res=0;
  	for(var i=0;i<e.content.length;++i)
  	{
  		if(e.content[i].isLetter)
  			{ p=0; break; }
  		else if(e.content[i]>='0'&&e.content[i]<='9')
  			q=1;
  		else if(!(e.content[i]=='+'||e.content[i]=='-'||e.content[i]=='/'||e.content[i]=='*'))
                 r=0;
  	}
    if(p*r*q)
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
  	e.channel.send("See if your favourite streamers are online! Use '..twitch <channel-ID>'\nI do quickmafs too (simple mafs pls)\nYou can ask me the time too! Do '..time'\nkthnxbye");
  }
  var id1="<@395951512767168514>"
  for(var i=0;i<id1.length;++i)
  {
  	if(e.content[i]!=id1[i])
  		flag=0;
  }	
  	if(flag&&e.content.length>21)
  	{
      e.channel.send("sorry, i dont speak inglis, pls ask my good frand zorin");
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
