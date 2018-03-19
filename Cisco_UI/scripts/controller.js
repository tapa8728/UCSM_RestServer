// https://spring.io/guides/gs/consuming-rest-jquery/


$(document).ready(function() {
    
    console.log("Controller activated.");
    $("#dash_button").css('visibility','hidden');

    var currdevicename= "";
    var currdeviceIP = "";
    // Login
    $("#login_button").click(function(e){
        e.preventDefault();
        u_input = document.getElementById("u_name").value;
        p_input = document.getElementById("p_name").value;
        device= document.getElementById("devices").value;   // get it from the login page.
        console.log("Before splitting device :" + device);
        currdevicename = device.split(":")[0];
        currdeviceIP = device.split(":")[1];
        //console.log("currdevicename : ", currdevicename);
        //console.log("currdeviceIP : ", currdeviceIP);
        localStorage.setItem('devicename', currdevicename);
        localStorage.setItem('deviceIP', currdeviceIP);
        console.log("U : "+ u_input +" P : "+ p_input);
        loginPostRequest(u_input, p_input, currdevicename);
    });

    // Add a device pop-up
    $( "#addDevice_modal" ).dialog({ autoOpen: false });
    $( "#add_device" ).click(function() {
        console.log("Inside Add Device Modal");
        $( "#addDevice_modal" ).dialog( "open" );
    });

    // Submitting add device
    $("#addDev_submit").click(function(e){
        newDevName = document.getElementById("newDevName").value;
        newDevIP = document.getElementById("newDevIP").value;
        $("#addDevice_modal").dialog("close");
        addNewDeviceHandler(newDevName, newDevIP);
    });

    // Delete a device  pop-up
    $( "#delDevice_modal" ).dialog({ autoOpen: false });
    $( "#del_device" ).click(function() {
        console.log("Inside Delete Device Modal");
        $( "#delDevice_modal" ).dialog( "open" );
    });

    // Submitting delete device
    $("#delDev_submit").click(function(e){
        $("#delDevice_modal").dialog("close");
        newDevName = document.getElementById("newDevName").value;
        newDevIP = document.getElementById("newDevIP").value;
        delNewDeviceHandler(newDevName, newDevIP);
    });

    // cancelling delete device
    $("#delDev_cancel").click(function(e){
        $("#delDevice_modal").dialog("close");
    });

});

function rowClick(row_id){
    console.log("rowClick : ", row_id);
    row_find = "#"+row_id;
    console.log("Row to be found :", row_find);
    var dname=$("#devices_table").find(row_find).find("#dev_name").html();
    var dip = $("#devices_table").find(row_find).find("#dev_ip").html();
    console.log("Dev name : "+dname);
    console.log("Dev IP : "+dip);
    //isChecked = $("#devices_table").find(row_find).find("#cbox").is(':checked');
    //console.log(row_find + " Is checked - " + isChecked);
    

    // now if this row is checked, uncheck all others
    // if (isChecked){
    //     var t =  $("#devices_table").find('tbody').children();
    //     for(var m=0; m<t.length; m++){
    //         if(t[m]['id'] == row_id){
    //             console.log("Do notthing");
    //         }
    //         else{
    //             console.log("Unselect all others");
    //             if($("#tr-row2").children().find("#cbox").is(':checked')){
    //                 console.log("uncheck this");
    //                 $("#tr-row2").children().find("#cbox").prop('checked', false);
    //                 console.log("Uncheckd");
    //             }
    //         }
    //     }

    // }
}

// --------------
// Devices 
// --------------
function devicesGetRequest(){
    console.log("[devicesGetRequest] Begin");
    var nicprofiles = $.ajax({
        url: "http://localhost:4567/devices", 
        type: 'GET', 
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{},
        success: function(data, textStatus, xhr) {
            console.log("[GET DEVICES] Passed Status: " + xhr.status);
            console.log("[RESPONSE] Devices data: "+ data);
            var dev = JSON.parse(data)['devices'];
            // clear elements 
            $("#devices_table").find('tbody').empty();
            $("#devices").empty();
            var row_id = "";
            for (var i = 0; i < dev.length; i++) {
                console.log(dev[i]);
                devname = dev[i]["deviceName"];
                ip = dev[i]["ipAddress"];
                $("#devices").append( 
                    "<option value="+ devname+":"+ip+">"+ devname+" : "+ip+"</option>"
                );
                row_id = 'tr-row'+i;
                // Devices Table
                $("#devices_table").find('tbody').append( 
                    "<tr id='"+row_id+"' onclick=rowClick('"+row_id+"')>"+
                    "<td><label class='radio'><input type='radio'>"+
                    "<span class='radio__input'></span></label></td>"+
                    "<td id='dev_name'>"+ devname +"</td>"+
                    "<td id='dev_ip'>"+ ip +"</td>"+
                    "</tr>" 
                );
                // $("#devices_table").find("#tr-row0").find("#cbox").is(':checked') 

            }
            console.log("[RESPONSE] Devices in drop down menu completed");
            // push the data on the table. ?? 
            // $('.nic-result').text(data); 
        },
        error: function(data, textStatus, xhr) {
            console.log("[GET DEVICES]Failed Status" + xhr.status);
        }
    });
} // end of devicesGetRequest function. 

// --------------
// Add a new Device
// --------------
function addNewDeviceHandler(devName, devIP){
    console.log("[NEW DEVICE] Begin");
    var json_input = JSON.stringify(
        [
            {
                deviceName: localStorage.getItem('devicename'), //Current device you are logged into. 
                ipAddress: localStorage.getItem('deviceIP')
            },
            {
                deviceName: devName, //"admin",
                ipAddress: devIP
            }
        ]);
    console.log("[ADD DEVICE] data: ", json_input);
    var addNewDevice = $.ajax({
        url: "http://localhost:4567/devices",
        type: 'POST', 
        data: json_input,
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{

        },
        success: function(data, textStatus, xhr) {
            console.log("Device Successfully added");
            devicesGetRequest();

        },
        error: function(data, textStatus, xhr) {
            console.log("[GET NICPROFILES]Failed Status" + xhr.status);
        }
    });
}

// --------------
// Delete a new Device
// --------------
function delNewDeviceHandler(devName, devIP){
    console.log("[DELETE DEVICE] Begin");

}


// --------------
// Login Page
// --------------
function loginPostRequest(u_input, p_input, devicename) {
    console.log("[loginPostRequest] Begin");
    var json_input = JSON.stringify({
            username: u_input, //"admin",
            password: p_input
        });
    var test;
    var login = $.ajax({
        url: "http://localhost:4567/"+devicename+"/login", 
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


// -------------- 
// Logout request
// --------------
function logoutRequest(devicename){

}

// --------------
// Nic Profiles
// --------------
function nicProfileGetRequest(devicename){
    console.log("[nicProfileGetRequest] Begin");
    // make calls to Nic Profiles. 
    var nicprofiles = $.ajax({
        url: "http://localhost:4567/"+devicename+"/nicprofiles", 
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

// --------------
// Domains
// --------------
function domainsGetRequest(devicename){
    console.log("[domainsGetRequest] Begin");
    // make calls to get Domains
    var domains = $.ajax({
        url: "http://localhost:4567/"+ devicename +"/domains", 
        type: 'GET', 
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{},
        success: function(data, textStatus, xhr) {
            console.log("[GET DOMAINS] Passed Status" + xhr.status);
            console.log("Domain data: "+ data);
            var json = JSON.parse(data);
            var dom = json['domains'];
            console.log("dom:", dom);
            // Domain Table
            for (var i = 0; i < dom.length; i++) {
                id = dom[i]['id'];
                name = dom[i]['name'];
                type = dom[i]['type'];
                encap_num = dom[i]['encaps'].length;
                $("#domains_table").find('tbody').append( 
                    "<tr>"+
                    "<td><label class='checkbox'><input type='checkbox'/>"+
                    "<span class='checkbox__input'></span></label></td>"+
                    "<td>"+ id +"</td>"+
                    "<td>"+name +"</td>"+
                    "<td>"+ type +"</td>"+
                    "<td>"+ encap_num +"</td>"+
                    "</tr>" 
                );
                console.log("row appended");
            }
            // Encaps table, should be linked to selection on domain table.. currently show all possible encaps
            for (var j = 0; j < dom.length; j++) {
                var encaps = dom[j]["encaps"]; // this will be an array
                for (var i = 0; i<encaps.length; i++) {
                    name = encaps[i]['name'];
                    type = encaps[i]['encapType'];
                    vxlan = encaps[i]['vxlanId'];
                    if(vxlan == ""){
                        vxlan = "N/A";
                    }
                    id = encaps[i]['id'];
                    pvlanConfig = encaps['pvlanConfig'];
                    if(pvlanConfig == null){
                        pvlanConfig = "N/A"
                    }
                    $("#encaps_table").find('tbody').append( 
                        "<tr>"+
                        "<td><label class='checkbox'><input type='checkbox'/>"+
                        "<span class='checkbox__input'></span></label></td>"+
                        "<td>"+ id +"</td>"+
                        "<td>"+ name +"</td>"+
                        "<td>"+ type +"</td>"+
                        "<td>"+ vxlan +"</td>"+
                        "<td>"+ pvlanConfig +"</td>"+
                        "</tr>" 
                    );
                    console.log("row appended");
                }
                
            }
            console.log("[RESPONSE] Domains Table Completed");
            // push the data on the table. ?? 
            //$('.domains-result').text(data); 
        },
        error: function(data, textStatus, xhr) {
            console.log("[GET DOMAINS] Failed Status" + xhr.status);
        }
    });
} // end of domainsGetRequest function. 


// --------------
// Uplink Profiles
// --------------
function uplinkProfGetRequest(devicename){
    console.log("[uplinkProfGetRequest] Begin");
    // make calls to get system INformation
    var nicprofiles = $.ajax({
        url: "http://localhost:4567/"+ devicename +"/uplinkprofiles", 
        type: 'GET', 
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{},
        success: function(data, textStatus, xhr) {
            console.log("[GET uplinkProfGetRequest]Passed Status" + xhr.status);
            console.log("uplinkProfGetRequest data: "+ data);
            var json = JSON.parse(data);
            var up = json['uplinkProfiles'];
            console.log("up:", up);
            // Uplink Profiles Table
            for (var i = 0; i < up.length; i++) {
                id = up[i]['id'];
                name = up[i]['name'];
                domainRefIds = up[i]['domainRefIds']; // will be an array
                if(domainRefIds.length == 0){
                    domainRefIds = "N/A";
                }
                else{
                    console.log("How do display the domains ref ids ?");
                }
                
                $("#uplinkprof_table").find('tbody').append( 
                    "<tr>"+
                    "<td><label class='checkbox'><input type='checkbox'/>"+
                    "<span class='checkbox__input'></span></label></td>"+
                    "<td>"+ id +"</td>"+
                    "<td>"+name +"</td>"+
                    "<td>"+ domainRefIds +"</td>"+
                    "</tr>" 
                );
                console.log("uplink profile row appended");
            }
            // push the data on the table. ?? 
            $('.uplinkprof-result').text(data); 


        },
        error: function(data, textStatus, xhr) {
            console.log("[GET uplinkProfGetRequest]Failed Status" + xhr.status);
        }
    });
} // end of sysInfoGetRequest function. 

// --------------
// System Information
// --------------
function sysInfoGetRequest(devicename){
    console.log("[sysInfoGetRequest] Begin");
    // make calls to get system INformation
    var nicprofiles = $.ajax({
        url: "http://localhost:4567/"+ devicename +"/systeminformation", 
        type: 'GET', 
        //contentType: 'application/json', 
        crossDomain: true,
        xhrFields : {
             withCredentials: true
        },
        headers :{},
        success: function(data, textStatus, xhr) {
            console.log("[GET SYSTEMINFO]Passed Status" + xhr.status);
            console.log("SystemInformation data: "+ data);
            var sys = JSON.parse(data)['systemInformation'];
            $("#sysinfo_table").find('tbody').append( 
                    "<tr><td> <b>Manufacturer</b></td><td>"+sys['manufacturer']+"</td></tr>"+
                    "<tr><td> <b>Model</b></td><td>"+sys['model']+"</td></tr>"+
                    "<tr><td> <b>Name</b></td><td>"+sys['name']+"</td></tr>"+
                    "<tr><td> <b>Version</b></td><td>"+sys['version']+"</td></tr>"+
                    "<tr><td> <b>Capabilities</b></td><td>"+sys['capabilities']['feature']+"</td></tr>"
            );
            console.log("[RESPONSE] SystemInformation Table Completed");
            // push the data on the table. ?? 
            //$('.sysinfo-result').text(data); 

        },
        error: function(data, textStatus, xhr) {
            console.log("[GET SYSTEMINFO]Failed Status" + xhr.status);
        }
    });
} // end of sysInfoGetRequest function. 

    
    
    
  
