let map, infoWindow;

function initMap() {
  //20.5785937,-90.0082602
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20.5785937, lng: -90.0082602 },
    zoom: 15,
  });

  const marker = new google.maps.Marker({
    position: { lat: 20.5785937, lng: -90.0082602 },
    map: map,
  });

  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "ir a mi la ubicacion actual";
  locationButton.classList.add("custom-map-control-button");
  locationButton.style.backgroundColor = 'rgb(0, 132, 255)';
  locationButton.style.color = 'white';
  locationButton.style.fontSize = '20px';
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const marker = new google.maps.Marker({
            position: pos,
            map: map,
          });

          infoWindow.setPosition(pos);
          infoWindow.setContent("Ubicacion encontrada.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
     
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: La geolocalización fallo."
      : "Error: Tu navegador no lo soporta."
  );
  infoWindow.open(map);
}

window.initMap = initMap;