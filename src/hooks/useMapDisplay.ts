import axios from "axios";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

const ZOOM = 16;
const PITCH = 40;

function getMapboxRequestURL(searchParam: string): string {
    const uriEncoded = encodeURIComponent(searchParam);

    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${uriEncoded}.json?proximity=ip`;
}

async function getCoordsFromAddress(
    address: string
): Promise<[number, number]> {
    const requestURL = getMapboxRequestURL(address);

    const res = await axios.get(requestURL, {
        params: {
            access_token:
                "pk.eyJ1IjoibHVjYXNmYW4iLCJhIjoiY203bGlzeDBjMGJyeDJrcHRzOWFtMmVrciJ9.ispn4TNP3afN0jFC4npUEg",
        },
    });

    const [lng, lat] = res.data.features[0].geometry.coordinates;
    return [lng, lat];
}

function add3DLayer(map: mapboxgl.Map) {
    map.on("style.load", () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle()?.layers ?? [];

        const labelLayerId = layers.find(
            layer => layer.type === "symbol" && layer.layout?.["text-field"]
        )?.id;

        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
            {
                id: "add-3d-buildings",
                source: "composite",
                "source-layer": "building",
                filter: ["==", "extrude", "true"],
                type: "fill-extrusion",
                minzoom: 14,
                paint: {
                    "fill-extrusion-color": "#aaa",

                    // Use an 'interpolate' expression to
                    // add a smooth transition effect to
                    // the buildings as the user zooms in.
                    "fill-extrusion-height": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        15,
                        0,
                        15.05,
                        ["get", "height"],
                    ],
                    "fill-extrusion-base": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        15,
                        0,
                        15.05,
                        ["get", "min_height"],
                    ],
                    "fill-extrusion-opacity": 0.6,
                },
            },
            labelLayerId
        );
    });
}

export default function useMapDisplay(
    container: React.RefObject<HTMLElement>,
    location?: string
) {
    const map = useRef<mapboxgl.Map | null>(null);
    const [coord, setCoord] = useState<[number, number] | null>(null);

    useEffect(() => {
        (async () => {
            if (!location) {
                return;
            }

            setCoord(await getCoordsFromAddress(location));
        })();
    }, [location]);

    useEffect(() => {
        if (map.current || !container.current || !coord) return; // initialize map only once

        map.current = new mapboxgl.Map({
            container: container.current,
            style: "mapbox://styles/mapbox/standard",
            // style: "mapbox://styles/mapbox/light-v11",
            center: coord,
            zoom: ZOOM,
            pitch: PITCH,
            antialias: true,
        });

        new mapboxgl.Marker().setLngLat(coord).addTo(map.current);

        add3DLayer(map.current);
    });
}
