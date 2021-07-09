import React, { useState, useEffect } from "react";
import ReserveParkingSpot from "./ReserveParkingSpot";
import ParkingInfo from "./ParkingInfo";
import { useDispatch, useSelector } from "react-redux";
import * as parkingActions from "../../store/actions/parking-actions";

const ParkingDetails = (props) => {
	const dispatch = useDispatch();
	const numberOfParkingSpots = 10;
	const [carsParked, setCarsParked] = useState("");
	let carParked = useSelector((state) => state.parking.carParked);
	useEffect(() => {
		updateParkedCars();
	}, []);

	useEffect(() => {
		updateParkedCars();
	}, [carParked]);

	const updateParkedCars = () => {
		let users = JSON.parse(localStorage.getItem("users"));
		users = users.filter((usr) => {
			return Object.keys(usr.activeSession).length > 0;
		});
		setCarsParked(users.map((usr) => usr.plate));
	};
	return (
		<div className={"fixed bottom-0 bg-white w-full  p-4 flex  justify-center"}>
			<div className={" w-full flex flex-col text-sm"}>
				<span
					className={
						"flex self-end border-black border-2 rounded-full px-2 py-1 font-bold cursor-pointer"
					}
					onClick={() => dispatch(parkingActions.showParkingPopUp(false))}
				>
					X
				</span>
				<div className={"flex flex-col "}>
					<h1 className={"font-bold text-lg"}>Parking</h1>
					<span className={"text-gray-700"}>Doctor Grigore Romniceanu </span>
					<span className={"text-gray-700 mb-8"}>Bucharest</span>
				</div>
				<div
					className={
						"flex w-full sm:flex-row flex-col " +
						(numberOfParkingSpots - carsParked.length > 0
							? "justify-between "
							: "justify-center")
					}
				>
					<ParkingInfo
						numberOfParkingSpots={numberOfParkingSpots}
						carsParked={carsParked}
					/>
					{numberOfParkingSpots - carsParked.length > 0 ? (
						<ReserveParkingSpot />
					) : null}
				</div>
			</div>
		</div>
	);
};

export default ParkingDetails;
