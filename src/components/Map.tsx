"use client"
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';


interface Hazard {
    severity: string;
    type: string;
    name: string;
    latitude: number;
    longitude: number;
    created: string;
    lastUpdate: string;
}

interface HazardMarker {
    fillColor: string;
    radius: number;
}

const ShapefileLayer: React.FC = () => {
    const map = useMap();

    useEffect(() => {
        // Carica il file GeoJSON localmente
        fetch('/africa_shape.json')
            .then((response) => response.json())
            .then((geojson) => {
                console.log('GeoJSON caricato correttamente:', geojson);

                // Aggiungi i dati GeoJSON alla mappa con chiavi uniche
                L.geoJSON(geojson, {
                    onEachFeature: (feature, layer) => {
                        const uniqueKey = feature.properties.name + '-' + feature.geometry.coordinates; // Genera una chiave unica
                        layer.bindPopup(`<strong>${uniqueKey}</strong>`);
                    },
                    style: {
                        color: 'green',
                        weight: 2,
                        fillColor: 'blue',
                        fillOpacity: 0.5,
                    },
                }).addTo(map);
            })
            .catch((err) => console.error('Errore nel caricamento del GeoJSON:', err));
    }, [map]);

    return null;
};


const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2FsdmF0b3JlYXZhbnpvNzUiLCJhIjoiY20yZnBpdjJ0MGJ5azJscXplbG0xeTMzdyJ9.3WuDPJmpXhT5BsNQYfmqvQ"//process.env.NEXT_PUBLIC_MAPBOXTOKEN;

const Map: React.FC = () => {
   const [hazards, setHazards] = useState<Hazard[]>([]);


    useEffect(() => {
        fetch("https://api.hungermapdata.org/v1/climate/hazards")
            .then((res) => res.json())
            .then((data) => {
                setHazards(data.body.hazards);
            });
    }, []);

    const getHazardOptions = (severity: string): HazardMarker => {
        return {
            fillColor: severity === 'WARNING' ? 'orange' : severity === 'WATCH' ? 'yellow' : severity === 'ADVISORY' ? 'green' : 'red',
            radius: severity === 'WARNING' ? 8 : severity === 'WATCH' ? 5 : severity === 'ADVISORY' ? 3 : 12
        };
    }


    return (
        <MapContainer
            center={[0, 20]}
            zoom={2}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`}
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
                tileSize={512}
                zoomOffset={-1}
            />

            <ShapefileLayer />

            {hazards && hazards.map((hazard) => (
                <CircleMarker
                    key={hazard.name}
                    center={[hazard.latitude, hazard.longitude]}
                    pathOptions={{
                        color: getHazardOptions(hazard.severity).fillColor,
                        fillColor: getHazardOptions(hazard.severity).fillColor
                    }}
                    radius={getHazardOptions(hazard.severity).radius}>
                    <Popup>{hazard.name}</Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default Map;




