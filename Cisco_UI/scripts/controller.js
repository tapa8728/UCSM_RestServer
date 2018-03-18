// https://spring.io/guides/gs/consuming-rest-jquery/


$(document).ready(function() {
    
    console.log("Document Ready - Main UI thread");
    $("#dash_button").css('visibility','hidden');

    // Login
    $("#login_button").click(function(e){
        e.preventDefault();
        u_input = document.getElementById("u_name").value;
        p_input = document.getElementById("p_name").value;
        console.log("U : "+ u_input +" P : "+ p_input);
        loginPostRequest(u_input, p_input);
    });

    // Logout
    $("icon-outbox").click(function(e){
        console.log("Activate logout function");
        logoutRequest();
    });

    $("#nicprof_button").click(function(e){
        e.preventDefault();
        
        nicProfileGetRequest();
    });
    $("#domains_button").click(function(e){
        e.preventDefault();
        domainsGetRequest();
    });
    $("#sysinfo_button").click(function(e){
        e.preventDefault();
        sysInfoGetRequest();
    });
});
  
// Login Page
function loginPostRequest(u_input, p_input) {
    console.log("[loginPostRequest] Begin");
    var json_input = JSON.stringify({
            username: u_input, //"admin",
            password: p_input
        });
    var test;
    var login = $.ajax({
        url: "http://localhost:4567/device4/login", 
        type: 'POST', 
        data: json_input,
        //contentType: 'text/html',   // toggle this in
        crossDomain: true,
        xhrFields : {
             withCredentials: true // make this "true" so it allows cookie passing
        },
        //headers :{ }, 
        success : function(data, textStatus, xhr) { // "data" -  will contain the response recieved from URL. 
            console.log("[POST LOGIN]Passed Status : ", xhr.status);
            if (xhr.status==200){
                /*var ca = document.cookie;
                console.log("JS cookie is :", ca);*/
                $('.login-result').text("Login Successful!"); 
                $("#dash_button").css('visibility','visible');
            }
        },
        error: function(data, textStatus, xhr) {
            test = data;
            console.log("[POST LOGIN]Failed Status" + textStatus +"   data: "+data+"   xhr  "+ xhr);
        }
    });
    
} // end of loginPostRequest function. 
    
// Logout request
function logoutRequest(){

}
function nicProfileGetRequest(){
    console.log("Here 1");
    // make calls to Nic Profiles. 
    var nicprofiles = $.ajax({
        url: "http://localhost:4567/device4/nicprofiles", 
        type: 'GET', 
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{},
        success: function(data, textStatus, xhr) {
            console.log("[GET NICPROFILES] Passed Status: " + xhr.status);
            console.log("[RESPONSE] Nic Profiles data: "+ data);
            var nicprofiles = JSON.parse(data)['nicProfiles'];
            for (var i = 0; i < nicprofiles.length; i++) {
                console.log(nicprofiles[i]);
                id = nicprofiles[i]['id'];
                name = nicprofiles[i]['name'];
                domainRefIds = nicprofiles[i]['domainRefIds'];
                if(domainRefIds.length == 0){
                    domainRefIds = "N/A";
                }
                $("#nicprofiles_table").find('tbody').append( 
                    "<tr>"+
                    "<td><label class='checkbox'><input type='checkbox'/>"+
                    "<span class='checkbox__input'></span></label></td>"+
                    "<td>"+ id +"</td>"+
                    "<td>"+ name +"</td>"+
                    "<td>"+ domainRefIds +"</td>"+
                    "</tr>" 
                );
                console.log("row appended");
            }
            console.log("[RESPONSE] Nic Profiles Table Completed");
            // push the data on the table. ?? 
            // $('.nic-result').text(data); 
        },
        error: function(data, textStatus, xhr) {
            console.log("[GET NICPROFILES]Failed Status" + xhr.status);
        }
    });
} // end of nicProfileGetRequest function. 

function domainsGetRequest(){
    // make calls to get Domains
    var nicprofiles = $.ajax({
        url: "http://localhost:4567/device3/domains", 
        type: 'GET', 
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{},
        success: function(data, textStatus, xhr) {
            console.log("[GET DOMAINS]Passed Status" + xhr.status);
            console.log("Nic Profiles data: "+ data)


            
        },
        error: function(data, textStatus, xhr) {
            console.log("[GET DOMAINS]Failed Status" + xhr.status);
        }
    });
} // end of nicProfileGetRequest function. 

function sysInfoGetRequest(){
    // make calls to get system INformation
    var nicprofiles = $.ajax({
        url: "http://localhost:4567/device3/systeminformation", 
        type: 'GET', 
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{},
        success: function(data, textStatus, xhr) {
            console.log("[GET SYSTEMINFO]Passed Status" + xhr.status);
            console.log("SystemInformation data: "+ data)
        },
        error: function(data, textStatus, xhr) {
            console.log("[GET SYSTEMINFO]Failed Status" + xhr.status);
        }
    });
} // end of sysInfoGetRequest function. 

    
    
    
  
