import {useEffect, useState} from "react";
import {CircleMarker, Popup} from "react-leaflet";

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


const HazardMarkers: React.FC = () => {
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
        <div>
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
        </div>
    );
};

export default HazardMarkers;
