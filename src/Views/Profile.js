import React, { useState } from "react";
import * as userActions from "../store/actions/users-action";
import { useDispatch, useSelector } from "react-redux";

const Profile = (props) => {
	const [plate, setPlate] = useState("");

	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const saveChanges = () => {
		console.log("save changes to plate");
		user.plate = plate;
		let users = JSON.parse(localStorage.getItem("users"));
		users.forEach((usr, i) => {
			if (usr.email === user.email) {
				users[i] = user;
			}
		});
		localStorage.setItem("users", JSON.stringify(users));
		dispatch(userActions.saveUser(user));
	};
	return (
		<div className={"flex flex-col justify-center items-center"}>
			<span className={"p-4 font-bold"}>Plate Number</span>
			<input
				type="text"
				className={"rounded-lg my-2 p-3 border w-6/12"}
				value={user.plate.length > 0 ? user.plate : plate}
				onChange={(event) => setPlate(event.target.value)}
			/>
			<button className={"button bgSuccess"} onClick={saveChanges}>
				Save Changes
			</button>
		</div>
	);
};

export default Profile;
