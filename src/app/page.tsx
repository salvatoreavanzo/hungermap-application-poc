"use client"
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false, // Evitiamo il rendering lato server
});

export default function Home() {
  return (
      <div style={{height: '100vh'}}>
        <Map/>
      </div>
  );
}
