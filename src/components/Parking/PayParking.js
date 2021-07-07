import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as userActions from "../../store/actions/users-action";
import * as parkingActions from "../../store/actions/parking-actions";

const PayParking = (props) => {
	const user = useSelector((state) => state.user.user);
	const carParked = useSelector((state) => state.parking.carParked);
	const dispatch = useDispatch();
	const payNow = () => {
		user.activeSession.endTime = moment();
		if (user.history.length === 0) {
			user.history = [user.activeSession];
			user.activeSession = "";
		} else {
			user.history.push(user.activeSession);
			user.activeSession = "";
		}
		const users = JSON.parse(localStorage.getItem("users"));
		users.forEach((usr, i) => {
			if (usr.email === user.email) {
				users[i] = user;
			}
		});
		dispatch(userActions.saveUser(user)).then(() => {
			localStorage.setItem("users", JSON.stringify(users));
			dispatch(parkingActions.payParking(false));
		});
		dispatch(parkingActions.carParked(!carParked));
	};

	return (
		<div
			className={
				"absolute centerAbsoluteBox bg-white w-full h-screen items-center justify-center flex "
			}
		>
			<div
				className={
					"flex flex-col bg-yellow-100 p-4 rounded-lg md:w-6/12 lg:w-4/12 w-10/12 text-sm shadow-lg"
				}
			>
				<span>Thank you for using our parking!</span>
				<div className={"flex justify-between border-b py-2"}>
					<span>You parked at </span>
					<span>{user.activeSession.startTime}</span>
				</div>
				<div className={"flex justify-between border-b py-2"}>
					<span>Duration</span>
					<span>
						{user.activeSession.duration}{" "}
						{user.activeSession.duration > 1 ? "minutes" : "minute"}
					</span>
				</div>
				<div className={"flex justify-between border-b py-2"}>
					<span>Amount to pay</span>
					<span>{user.activeSession.amount} lei</span>
				</div>
				<button className={"button bgSuccess"} onClick={payNow}>
					Pay Now
				</button>
			</div>
		</div>
	);
};

export default PayParking;
