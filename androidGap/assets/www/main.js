//Peter Valleskey
// telnet localhost 5554
// geo fix 10.40 40.60

var findLocation = function() {
	var options = { enableHighAccuracy: true }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);  
}
var onSuccess = function(position) {
    var image_url = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=14&size=280x370&markers=color:blue|label:S|" + position.coords.latitude + "," + position.coords.longitude;
    $("#map").html("");
    $("#map").attr("align", "center");
    $("#map").append("<img />");
    $("#map img").attr("src", image_url);
    $("#map img").attr("alt", "Google Map");
}
var onError = function(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
  }

$("#example2").bind("click", function() {
    findLocation();
});
$("#example1").bind("click", function() {
    showConfirm();
});
$("#example2").button();
$("#example2").button('disable');

var onConfirm = function(button) {
    if(button === 1) {
        $('#example2').button('enable');
    } else {
        $('#example2').button('disable');
    }
}

// Show a custom confirmation dialog
//
var showConfirm = function() {
    navigator.notification.confirm(
        'Geolocation On / Off',  // message
        onConfirm,                          // callback to invoke with index of button pressed
        'PhoneGap Feature',                // title
         'On,Off'                           // buttonLabels
    );
}