
angular.module('myApp', ['uiGmapgoogle-maps'])
    .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
})




    .controller("myCtrl", function($scope, $http){
        $scope.map = {center: {latitude: 29.650793, longitude: -82.326780 }, zoom: 13 };
        $scope.marker = {
          id: 0,
          coords: {
            latitude: 0,
            longitude: 0,
          },
          options: { draggable: false },
          events: {
              dragend: function (marker, eventName, args) {
                $log.log('marker dragend');
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                $log.log(lat);
                $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
                };
              }
            }
          };

        $scope.getLocation = function(){
          if (navigator){
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            x.innerHTML="Geolocation is not supported by this browser."
          }
          console.log("Im looking i promise")

    };

    function showPosition(position){
      $scope.marker.coords.latitude = position.coords.latitude;
      $scope.marker.coords.longitude = position.coords.longitude;
    }

    $scope.saveSpot = function(){
      console.log("before the spot");
       var spot = {
         longitude: $scope.marker.coords.longitude,
         latitude: $scope.marker.coords.latitude,
         available: true,

       };
       console.log("before the post");
       $http.post("/api/spots", spot)
            .then(function(response){
              console.log(response.data);
            });

    };
      $scope.removeSpot = function(lat,long){
        var url = '/api/spots/'+lat.toFixed(1)+'/'+long.toFixed(1);
        $http.put(url, {available: false})
             .then(function(response){
               $scope.marker.coords.latitude = 0;
               $scope.marker.coords.longitude = 0;
             });

    };

});
