import React, { useState } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	Polygon,
	InfoBox
} from "@react-google-maps/api";

import Parking from "../Parking/Parking";
import PayParking from "../Parking/PayParking";
import { useDispatch, useSelector } from "react-redux";
import * as parkingActions from "../../store/actions/parking-actions";

const containerStyle = {
	width: "100%",
	height: "100vh"
};

const center = {
	lat: 44.427634816785925,
	lng: 26.072549856607193
};

const markerPosiiton = {
	lat: 44.427634816785925,
	lng: 26.072549856607193
};

const polygonPaths = [
	{ lat: 44.42768413985158, lng: 26.07244256824925 },
	{ lat: 44.42759267665816, lng: 26.072614900171647 },
	{ lat: 44.427603690558115, lng: 26.072645745573347 },
	{ lat: 44.42769563259872, lng: 26.072484813038532 }
];

const polygonOptions = {
	fillColor: "lightblue",
	fillOpacity: 1,
	strokeColor: "blue",
	strokeOpacity: 1,
	strokeWeight: 2,
	// clickable: false,
	draggable: false,
	editable: false,
	geodesic: false
};

const infoBoxOptions = { closeBoxURL: "", enableEventPropagation: true };
const Gmaps = (props) => {
	const dispatch = useDispatch();

	const payParking = useSelector((state) => state.parking.payParking);
	const showParkingPopUp = useSelector(
		(state) => state.parking.showParkingPopUp
	);
	console.log(showParkingPopUp);
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyBb9hgzt0E5hpIhOFnmkgO82Kd4hAk3pqQ"
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={15}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				<Polygon
					paths={polygonPaths}
					options={polygonOptions}
					onMouseOver={() => dispatch(parkingActions.showParkingPopUp(true))}
					draggable={true}
				/>
				<Marker position={markerPosiiton} />
			</GoogleMap>
			{showParkingPopUp ? <Parking /> : null}
			{payParking ? <PayParking /> : null}
		</>
	) : (
		<></>
	);
};
export default Gmaps;
