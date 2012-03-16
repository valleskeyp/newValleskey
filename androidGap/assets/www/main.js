//Peter Valleskey
// telnet localhost 5554
// geo fix 10.40 40.60

var watchID = null;
document.addEventListener("deviceready", onDeviceReady, false);

// -- Functions that require Device to be Ready
function onDeviceReady() {
    startWatch();
}

//-- Geolocation
function geoError(geoError){
	alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
}
var findLocation = function() {
	options = { enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(geoImg, geoError, options);  
}
var geoImg = function(position) {
    var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=14&size=280x370&markers=color:blue|label:S|" + position.coords.latitude + "," + position.coords.longitude;
    $("#map").css("margin", "0px");
    $("#map").css("padding", "0px");
    $("#map").css("background", "url("+image_url+")");
    $("#map").css("background-repeat", "no-repeat");
    $("#map").css("height", "370px");
}

// -- Button Binds
$("#example2").bind("click", function() {
    findLocation();
});
$("#example1").bind("click", function() {
    showConfirm();
});
$("#example4").bind("click", function() {
    checkConnection();
});
$("#example2").button();
$("#example2").button('disable');

//-- Notification
var onConfirm = function(button) {
    if(button === 1) {
        $('#example2').button('enable');
    } else {
        $('#example2').button('disable');
    }
}
var showConfirm = function() {
    navigator.notification.confirm(
        'Geolocation On / Off',
        onConfirm,
        'PhoneGap Feature',
        'On,Off'
    );
}

//-- Connection
var alertDismissed = function(){}
var checkConnection = function() {
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    navigator.notification.alert(
                                 "Connection Type: " + states[networkState],
                                 alertDismissed,
                                 'Connection Type',
                                 'Done'
                                 );
}

// -- Compass
var startWatch = function() {    
    var options = { frequency: 100 };
    watchID = navigator.compass.watchHeading(compassSuccess, comError, options);
}
var compassSuccess = function(heading) {
    var dir = heading.magneticHeading;
    if       (dir > 337.5 && dir <= 359.9 || dir >= 0 && dir <= 22.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>N</p>");
    } else if(dir > 22.5 && dir <= 67.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>NW</p>");
    } else if(dir > 67.5 && dir <= 112.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>E</p>");
    } else if(dir > 112.5 && dir <= 157.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>SE</p>");
    } else if(dir > 157.5 && dir <= 202.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>S</p>");
    } else if(dir > 202.5 && dir <= 247.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>SW</p>");
    } else if(dir > 247.5 && dir <= 292.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>W</p>");
    } else if(dir > 292.5 && dir <= 337.5) {
        $("#compass").html("<p font-size='20px' text-align='center'>NW</p>");
    }
}
var stopWatch = function() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
}
function comError(compassError) {
	alert("Compass couldn't start: " + compassError.code);
	stopWatch();
}