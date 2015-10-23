var mapOptions = {
    center: new google.maps.LatLng(29.650793, -82.326780),
    zoom: 14,
    mapTypeId:google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map (document.getElementById("map"), mapOptions);

google.maps.event.addDomListener(window, 'load', initialize);

var marker=new google.maps.Marker({
  position:myCenter,
  });

var mapProp = {
  center:myCenter,
  zoom:5,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };
 //   new google.maps.Map(HTMLElement,MAPOPTIONS)
 //    mapvariable.fitBounds();

 
