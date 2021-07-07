import React, { useState, useEffect } from "react";
import moment from "moment";
import * as userActions from "../../store/actions/users-action";
import * as parkingActions from "../../store/actions/parking-actions";
import { useDispatch, useSelector } from "react-redux";
const ParkingTime = (props) => {
	const dispatch = useDispatch();
	const [parkingTime, setParkingTime] = useState(1);
	const [dateItWasParked, setDateItWasParked] = useState("");
	const [parkedCar, setParkedCar] = useState("");
	const [amountToPay, setAmountToPay] = useState("");
	const [enterPlate, setEnterPlate] = useState(false);
	const [plate, setPlate] = useState("");

	const user = useSelector((state) => state.user.user);
	const payParking = useSelector((state) => state.parking.payParking);
	const carParked = useSelector((state) => state.parking.carParked);
	//on mount if user has active session then set the values
	useEffect(() => {
		if (Object.keys(user.activeSession).length > 0) {
			setDateItWasParked(user.activeSession.date);
			setParkingTime(user.activeSession.duration);
			setAmountToPay(user.activeSession.amount);
			setParkedCar(true);
		}
	}, []);

	useEffect(() => {
		if (payParking) {
			setDateItWasParked("");
			setParkingTime(1);
			setAmountToPay(0);
			setParkedCar(false);
		}
	}, [payParking]);
	//on clicking Park button

	const parkCar = () => {
		if (user.plate.length > 0) {
			dispatch(userActions.saveUser(user));
			setParkedCar(!parkedCar);
			setDateItWasParked(moment());
			setEnterPlate(false);
			saveUsers();
			dispatch(parkingActions.carParked(!carParked));
		} else if (user.plate.length === 0 && plate.length > 0) {
			user.plate = plate;
			dispatch(userActions.saveUser(user));
			setParkedCar(!parkedCar);
			setDateItWasParked(moment());
			setEnterPlate(false);
			saveUsers();
			dispatch(parkingActions.carParked(!carParked));
		} else {
			setEnterPlate(true);
		}
	};

	const parkHandler = () => {
		let currentDateAndTime = moment();

		var sessionActiveTime = moment.duration(
			currentDateAndTime.diff(dateItWasParked)
		);
		setParkingTime(sessionActiveTime.asMinutes());

		calculateFee(parkingTime);
	};

	//every minute update the parking info
	useEffect(() => {
		if (parkedCar) {
			setTimeout(() => {
				parkHandler();
			}, 1000 * 60);
		}
	});

	//if car is parked
	useEffect(() => {
		if (parkedCar) {
			parkHandler();
		}
	}, [parkedCar]);

	const calculateFee = (parkingTime) => {
		let firstHourPrice = 10;
		let nextHoursPrice = 5;
		let parkingTimeHours = Math.ceil(parkingTime / 60);
		let amount = firstHourPrice + nextHoursPrice * (parkingTimeHours - 1);
		setAmountToPay(amount);
	};

	const saveActiveSession = () => {
		let activeSession = {
			date: dateItWasParked,
			duration: Math.ceil(parkingTime),
			amount: amountToPay,
			startTime: moment(dateItWasParked).format("hh:mm a")
		};
		user.activeSession = activeSession;
		dispatch(userActions.saveUser(user));
		saveUsers();
	};

	const saveUsers = () => {
		let users = JSON.parse(localStorage.getItem("users"));
		users.forEach((usr, i) => {
			if (usr.email === user.email) {
				users[i] = user;
			}
		});
		localStorage.setItem("users", JSON.stringify(users));
	};

	useEffect(() => {
		if (parkedCar) {
			saveActiveSession();
		}
	}, [dateItWasParked, parkingTime, amountToPay]);

	return (
		<div
			className={"flex flex-col justify-center items-center sm:w-6/12 w-full "}
		>
			{parkedCar ? (
				<div className={"flex flex-col w-full"}>
					<div className={"flex justify-between border-b py-2"}>
						<span>You parked at </span>
						<span>{moment(dateItWasParked).format("hh:mm a")}</span>
					</div>
					<div className={"flex justify-between border-b py-2"}>
						<span>Duration</span>
						<span>
							{Math.ceil(parkingTime)} {parkingTime > 1 ? "minutes" : "minute"}
						</span>
					</div>
					<div className={"flex justify-between border-b py-2"}>
						<span>Amount to pay</span>
						<span>{amountToPay} lei</span>
					</div>
					<button
						className={"button bgSuccess"}
						onClick={() => dispatch(parkingActions.payParking(true))}
					>
						Pay Parking
					</button>
				</div>
			) : (
				<div className="flex flex-col w-full">
					{enterPlate ? (
						<div>
							<span>Please enter your plate</span>
							<input
								type="text"
								className={"border rounded-lg my-2 p-3"}
								onChange={(event) => setPlate(event.target.value)}
								value={plate}
							/>
						</div>
					) : null}
					<button
						className={"button bgSuccess "}
						onClick={() => {
							parkCar();
						}}
					>
						Park
					</button>
				</div>
			)}
		</div>
	);
};

export default ParkingTime;
