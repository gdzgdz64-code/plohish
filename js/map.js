/* =========================================================
   map.js — interactive Leaflet map (Федерация сегодня)
   Markers use the real federation addresses in Kursk.
   ========================================================= */
(function () {
  "use strict";

  function initMap() {
    if (typeof L === "undefined") return; // Leaflet unavailable (offline) -> keep card fallback
    var el = document.getElementById("kurskMap");
    if (!el) return;

    try {
      var map = L.map(el, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true
      }).setView([51.7115, 36.2025], 12);

      var customAttribution = 'Сообщить о проблеме | &copy; Авторы <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> <span class="map-attribution-heart" aria-hidden="true">♥</span> <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener">Сделать пожертвование</a>. <a href="https://wiki.osmfoundation.org/wiki/Terms_of_Use" target="_blank" rel="noopener">Условия сайта и API</a>';
      map.attributionControl.setPrefix("");
      map.attributionControl.addAttribution(customAttribution);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: ""
      }).addTo(map);

      if (map.zoomControl) map.zoomControl.setPosition("topright");

      var halls = [
        { c: [51.7330, 36.1900], t: "Зал в центре", d: "ул. Ленина, 30<br>ТЦ «Пушкинский», 4 этаж" },
        { c: [51.735827, 36.153238], t: "Зал на юге", d: "ул. 50 лет Октября, 135" }
      ];

      halls.forEach(function (h) {
        var m = L.marker(h.c).addTo(map);
        m.bindPopup("<strong>" + h.t + "</strong><br>" + h.d);
      });

      map.fitBounds(L.latLngBounds(halls.map(function (h) { return h.c; })), {
        padding: [70, 70], maxZoom: 13
      });
    } catch (e) {
      /* keep neutral fallback card if Leaflet init fails */
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMap);
  } else {
    initMap();
  }
})();
