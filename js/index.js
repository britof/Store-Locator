window.onload = () => {
    displayStores();
    
}

var map;
var markers = [];
var infoWindow;

function initMap() 
{
    var LosAngeles = {
        lat: 34.063380, 
        lng: -118.358080
        };
    map = new google.maps.Map(document.getElementById('map'), {
    center: LosAngeles,
    zoom: 11,
    mapTypeId: 'roadmap',
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    });
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
}

function displayStores() 
{
    var storesHtml = '';
    var i = 1;
    
    for(var store of stores) {
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml += `
                <div class="store-container">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">${i}</div>
                    </div>

                </div>
        `

        document.querySelector('.stores-list').innerHTML = storesHtml;
        i += 1;
    }
}

function showStoresMarkers() 
{
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()){
        var LatLng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"[0]];
        bounds.extend(LatLng);
        createMarker(LatLng, name, address, index+1);
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index) {
    var html = "<b>" + name + "</b> <br/>" + address;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: index.toString()
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
  }