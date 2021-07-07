import React, { useState } from "react";
import moment from "moment";

import ParkingTime from "./ParkingTime";
import SimulateParking from "./SimulateParking";
const ReserveParkingSpot = (props) => {
	const [simulateParkingTime, setSimulateParkingTime] = useState(false);

	return (
		<div
			className={"flex flex-col sm:w-6/12 w-full justify-center items-center"}
		>
			{simulateParkingTime ? <SimulateParking /> : <ParkingTime />}
			<button
				onClick={() => setSimulateParkingTime(!simulateParkingTime)}
				className={"button bg-gray-500"}
			>
				{simulateParkingTime
					? "Change to Park"
					: "Change to simulate Parking Time"}
			</button>
		</div>
	);
};

export default ReserveParkingSpot;
