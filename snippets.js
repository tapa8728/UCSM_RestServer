/*
    
    // CORS Get Request
    
    $.ajax({
        url: 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html', 
        type: 'GET', 
        contentType: 'text/plain', 
        xhrFields : {
             withCredentials: false
        }, 
        headers :{
            
        },
         success: function(data) {
            console.log("Successfull");
             console.log(data)
          },

          error: function() {
            // Here's where you handle an error response.
            // Note that if the error was due to a CORS issue,
            // this function will still fire, but there won't be any additional
            // information about the error.
          }
        })
        
*/

  
    
/*

    $.post("http://localhost:4567/device3/login",
    {
	"username": "admin2",
	"password": "ucspe"
    },
    function(data, status){
        //alert("Data: " + data + "\nStatus: " + status);
        console.log("Data: " + data + "\nStatus: " + status);
    }); */
    
   /* $.ajax({
        url: "http://localhost:4567/device2/login"
        //"http://api.openweathermap.org/data/2.5/forecast?zip=95054,us&appid=eca1f7263472119f178bc43775db2be8"//"http://rest-service.guides.spring.io/greeting"
    }).then(function(data) { // "data" -  will contain the response recieved from URL. 
        $('.greeting-id').append(data.id); // data is a JSON
        $('.greeting-content').append(data.content);
        $('.JSON').append(data);
        console.log(data)
    });
    
*/

    