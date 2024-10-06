import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Openrouteservice from "openrouteservice-js";
import L from "leaflet";

interface RouteResponse {
  features: {
    geometry: {
      coordinates: [number, number][];
    };
    properties: {
      segments: {
        duration: number;
      }[];
    };
  }[];
}

const DurationControl: React.FC<{ duration: number }> = ({ duration }) => {
  const map = useMap();

  useEffect(() => {
    const control = new L.Control({ position: "topright" });

    control.onAdd = () => {
      const div = L.DomUtil.create(
        "div",
        "max-h-15 max-w-30 text-black text-lg bg-white p-3 rounded-md shadow-md"
      );
      const hours = Math.floor(duration / 3600);
      const minutes = Math.round((duration % 3600) / 60);
      div.innerHTML = `<h4>Duración del viaje</h4><p>${
        hours > 0 ? `${hours} horas ` : ""
      }${minutes} minutos</p>`;
      return div;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map, duration]);

  return null;
};

const Map: React.FC = () => {
  const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);
  const [duration, setDuration] = useState<number | null>(null);

  const start: LatLngExpression = [51.5074, -0.1276];
  const end: LatLngExpression = [51.4778, -0.0015];

  useEffect(() => {
    const fetchRoute = async () => {
      const orsClient = new Openrouteservice.Directions({
        // api_key: "",
      });

      try {
        const directions: RouteResponse = await orsClient.calculate({
          coordinates: [
            [-0.1276, 51.5074],
            [-0.0015, 51.4778],
          ],
          profile: "driving-car",
          format: "geojson",
        });

        const coords = directions.features[0].geometry.coordinates.map(
          (coord) => [coord[1], coord[0]] as LatLngExpression
        );
        setRouteCoords(coords);

        const tripDuration =
          directions.features[0].properties.segments[0].duration;
        setDuration(tripDuration);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };

    fetchRoute();
  }, []);

  return (
    <MapContainer
      className="rounded-md"
      center={start}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {routeCoords.length > 0 && (
        <Polyline positions={routeCoords} color="blue" />
      )}
      <Marker position={start}></Marker>
      <Marker position={end}></Marker>
      {duration !== null && <DurationControl duration={duration} />}
    </MapContainer>
  );
};

export default Map;
