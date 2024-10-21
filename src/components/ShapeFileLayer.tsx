import {useMap} from "react-leaflet";
import {useEffect} from "react";
import L from "leaflet";


const ShapefileLayer: React.FC = () => {
    const map = useMap();

    useEffect(() => {
        // Fetch geojson
        fetch('/africa_shape.json')
            .then((response) => response.json())
            .then((geojson) => {
                console.log('GeoJSON caricato correttamente:', geojson);

                // Try to make unique geojson keys
                L.geoJSON(geojson, {
                    onEachFeature: (feature, layer) => {
                        const uniqueKey = `${feature.properties.name}-${feature.id}`;
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

export default ShapefileLayer;