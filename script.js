
   var BASE_URl= " https://codequotient.com/api/"
   var codeditor;
   var languageSelector;
   var languageid;
   var codewritten;
   var btncompile=document.getElementById("btncompile")
  
   btncompile.addEventListener('click',function(){
    languageSelector=document.getElementById("languageSelector");
   codeditor =ace.edit("editor");
   
   setlanguageid();
   setcode();
   sendcodeforsubmmision();



   });
   function sendcodeforsubmmision()
   {
      var urlget =BASE_URl +"executeCode";
      var request=new XMLHttpRequest();
      request.open("POST",urlget);
      request.setRequestHeader("Content-Type","application/json");
      var objectToSend={ code:codewritten,langId:languageid};
      request.send(JSON.stringify(objectToSend));
      request.addEventListener("load",function(){
        var response= JSON.parse( request.responseText);
        
        
        if("codeId" in response)
        {
          var codeId=response.codeId;
          console.log(codeId);
          compileCode(codeId);
          
          
          

        }
        else{
          alert("something went wrong")
          console.log(response);
        }
      })





   }

   function compileCode(codeId)
   {
   var urltocheck=BASE_URl+"codeResult/"+codeId;
   console.log(urltocheck)
    var outputconsole=document.getElementById("outputconsole");
   var request=new XMLHttpRequest();
      request.open("GET",urltocheck);
      request.send();
      request.addEventListener("load",function(){
        var response=JSON.parse(request.responseText);
        
        var data=JSON.parse(response.data);
        console.log(data.errors)


       
        if(data.status=="Pending")
        {
          compileCode(codeId);
         
        }
        else{
          if(data.errors==="")
          {
            console.log(data.output)
             outputconsole.innerHTML=data.output;
          }
          else{

             outputconsole.innerHTML=data.errors;
          }
        }

      })






   }
   function setcode()
   {

    codewritten=codeditor.getValue();
    console.log(codewritten)
   
   }

   function setlanguageid()
   {
      var selectedlanguage=languageSelector.value
      languageid=selectedlanguage;
     
      console.log(languageid);
     
   }



 
