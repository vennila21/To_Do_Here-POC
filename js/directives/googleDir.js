// Code goes here
'use strict';

App.directive('googlePlaces', function() {
    return {


        restrict: 'E',
        replace: true,
        // transclude:true,
        scope: {
            location: '='
        },


        template: '<input class="form-control" id="google_places_ac" name="google_places_ac" type="text" class="input-

block-level"/>',



        link: function($scope, elm, attrs) {
            $scope.alert = false;
            var autocomplete = new

                google.maps.places.Autocomplete($("#google_places_ac")[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();


                $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();



                $scope.$apply();



                var mapOptions = {
                    zoom: 8,


                    center: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
                    mapTypeId:

                        google.maps.MapTypeId.TERRAIN
                }
                var dummy = "Kannappar Thidal, Chennai, Tamil Nadu, India";

                var location = loadPlace();
                var latlon = {
                    lat: place.geometry.location.lat(),
                    lon: place.geometry.location.lng(),
                    place: document.getElementById("google_places_ac").value,
                    id: +new Date()
                };
                var locationRecord = JSON.parse(localStorage.location || "null") || [];
				var local;
                if ((locationRecord) && (locationRecord.length != 0)) {
                    for (var j = 0; j < locationRecord.length; j++) {
                        if (locationRecord[j].place !== latlon.place) {
                             local = true;
                        } else {
                            local = false;
                        }
                    }
                }else {
		local=true;
		}
                if (local) {
                    location.push(latlon);


                    savePlace();

                }


                for (var j = 0; j < locationRecord.length; j++) {
                    if (locationRecord[j].place == dummy) {
                        var abc = 1;

                        alert("Check now");
                        $scope.alert = true;

                    }
                }




                function loadPlace() {
                        return JSON.parse(localStorage.location || "null") ||

                            [];

                    }
                    //Save the new data in local storage
                function savePlace() {

                    localStorage.location = JSON.stringify(location);
                }



                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                $scope.markers = [];


                var createMarker =

                    function(info) {

                        var marker = new google.maps.Marker({
                            map: $scope.map,


                            position: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng())

                        });


                    }

                createMarker(latlon[0]);

            });
        }


    }


});
