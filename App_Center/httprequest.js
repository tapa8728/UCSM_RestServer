var HttpRequest = function()
{
}

var HttpRequest2 = function()
{
}


var tenantName;
var gDevCookie = Ext.util.Cookies.get("app_Cisco_ContractViewer_token");
var gChallenge = Ext.util.Cookies.get("app_Cisco_ContractViewer_urlToken");
var gTenant = getUrlVars()["dn"];
var gSystem =  window.location["host"];

HttpRequest.prototype.query = function (query,dev,ch,succ)
{
    var Http = new XMLHttpRequest();
    var url1 = 'https://'+gSystem+'/'+query;

    Http.open("GET", url1, false);

    Http.setRequestHeader("DevCookie",dev);
    Http.setRequestHeader("APIC-Challenge",ch);
    Http.setRequestHeader ("Accept", "application/json");

    Http.onreadystatechange = function(){
        if (Http.readyState==4){
            if (Http.status==200){
                succ(Http.responseText);
            }
        }
    }

    Http.send();
};

HttpRequest2.prototype.quer = function (query,dev,ch,succ)
{
    var Http = new XMLHttpRequest();
    var url1 = 'https://'+gSystem+'/'+query;

    Http.open("GET", url1, true);

    Http.setRequestHeader("DevCookie",dev);
    Http.setRequestHeader("APIC-Challenge",ch);
    Http.setRequestHeader ("Accept", "application/json");

    Http.onreadystatechange = function(){
        if (Http.readyState==4){
            if (Http.status==200){
                                succ(Http.responseText);
            }
        }
    };

    Http.send();
};

var username = 'admin';
var password = 'ins3965!';
var loginCred = {"aaaUser":{"attributes":{"name":username,"pwd":password}}};

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
}

// call 3
function startRender(hostname) {
    console.log("Token" +  Ext.util.Cookies.get("app_Cisco_ContractViewer_token"));
    console.log("URLToken" + Ext.util.Cookies.get("app_Cisco_ContractViewer_urlToken"));

    //d3.xhr("http://{0}/api/aaaLogin.json?gui-token-request=yes".format(hostname))
    d3.xhr("https://" + hostname + "/api/aaaLogin.json?gui-token-request=yes")
        .header("Content-Type","application/json")
        .post(JSON.stringify( loginCred ), function(err,received){
            var resp = JSON.parse(received.response);
        });
}

// FIRST CALL FROM ContractViewer_app.html
function httpLoginRequest() {
    httpReq = new HttpRequest();
    httpAsyncReq = new HttpRequest2();
    handleHttpRequest(); // 2 .. assume this works fine. 
    return 1;
}

// call 2
function handleHttpRequest() {
    var host = window.location["host"];
    startRender(host); // 3 .. comes back with a resp. 
    tenantName = gTenant.replace("uni/tn-", "");
    console.log("Tenant Name is: ", tenantName);
    console.log("Time in handleHttpRequest is: ", Date());
    handleTenantRequest(tenantName); // 4 ..? This is in /common/handleTenantRequestFilterQueries.js  .. this calls getJson 5
    // handleTenantRequest -- this call basically makes an APIC query call to get the data for contract diag. Not relevant to us. 
}

// call 6
function get(query, dev, ch, fromSubjectURL) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var Http = new XMLHttpRequest();
    var url1 = 'https://'+gSystem+'/'+query;
    Http.open("GET", url1, true);

    Http.setRequestHeader("DevCookie",dev);
    Http.setRequestHeader("APIC-Challenge",ch);
    Http.setRequestHeader ("Accept", "application/json");

    Http.onreadystatechange = function(){
        if (Http.readyState==4 && Http.status==200){
                // succ.callback = Http.responseText;
                // if(fromSubjectURL){
		//     outputOfSubjectUrls.push(Http.responseText)
                // }
                resolve(Http.responseText);
        }

    };

    Http.send();
    });
}

// call 5
function getJson(url, dev, ch, fromSubjectURL) {
  return get(url, dev, ch, fromSubjectURL).then(JSON.parse); // 6
}