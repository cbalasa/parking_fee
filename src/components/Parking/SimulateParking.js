import React, { useState } from "react";
import moment from "moment";
const SimulateParking = (props) => {
	const [parkingTime, setParkingTime] = useState(0);
	const [amountToPay, setAmountToPay] = useState(0);

	const calculateFee = (parkingTime) => {
		let firstHourPrice = 10;
		let nextHoursPrice = 5;
		let parkingTimeHours = Math.ceil(parkingTime / 60);
		let amount = firstHourPrice + nextHoursPrice * (parkingTimeHours - 1);
		setAmountToPay(amount);
	};

	return (
		<div className={"flex w-full"}>
			<div
				className={
					"flex flex-col justify-center items-center sm:w-6/12 w-full border-r"
				}
			>
				<span className={"font-bold"}>Enter parking duration</span>
				<div className={"flex justify-center"}>
					<input
						type="text"
						className={"rounded-lg m-2 p-2 border "}
						onChange={(event) => setParkingTime(event.target.value)}
					/>
					<span className={"flex self-center"}>Minutes</span>
				</div>
				<button
					className={"button bgSuccess "}
					onClick={() => calculateFee(parkingTime)}
				>
					Simulate Park
				</button>
			</div>
			<div className={"flex w-6/12 items-center justify-center"}>
				<div className={"flex justify-between w-full p-2 "}>
					<span>Amount to pay</span>
					<span>{amountToPay} lei</span>
				</div>
			</div>
		</div>
	);
};

export default SimulateParking;
