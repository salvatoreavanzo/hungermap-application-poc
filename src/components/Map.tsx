"use client"
import { MapContainer, TileLayer } from 'react-leaflet';
import ShapefileLayer from "@/components/ShapeFileLayer";
import HazardMarkers from "@/components/HazardMarkers";


// TODO This should be moved outside in an environment variable
const MAPBOX_ACCESS_TOKEN = "pk.eyJ1Ijoic2FsdmF0b3JlYXZhbnpvNzUiLCJhIjoiY20yZnBpdjJ0MGJ5azJscXplbG0xeTMzdyJ9.3WuDPJmpXhT5BsNQYfmqvQ"//process.env.NEXT_PUBLIC_MAPBOXTOKEN;

const Map: React.FC = () => {

    return (
        <MapContainer
            center={[0, 20]}
            zoom={5}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`}
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
                tileSize={512}
                zoomOffset={-1}
            />

            <ShapefileLayer />
            <HazardMarkers />

        </MapContainer>
    );
};

export default Map;




