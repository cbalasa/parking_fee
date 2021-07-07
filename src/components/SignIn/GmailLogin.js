import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import * as userActions from "../../store/actions/users-action";
import { useDispatch, useSelector } from "react-redux";
const clientId =
	"886326964224-crcqq0o4qlifsa2sud6ac6c8gt4vqgjm.apps.googleusercontent.com";

const GmailLogin = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const onSuccess = (res) => {
		let email = res.dt.Nt;
		let name = res.dt.Ve;
		let users = JSON.parse(localStorage.getItem("users"));
		let currentUser = [];
		if (users !== null) {
			currentUser = users.filter((usr) => usr.email === email);
		}

		if (currentUser.length > 0) {
			dispatch(userActions.saveUser(currentUser[0]))
				.then(() => {
					if (props.path !== undefined) {
						history.push(props.path);
					} else {
						history.push("/");
					}
				})
				.catch((err) => console.log(err));
		} else {
			if (users === null) {
				localStorage.setItem("users", [
					{
						name,
						email,
						history: "",
						activeSession: "",
						plate: ""
					}
				]);
			} else {
				users.push({
					name,
					email,
					history: "",
					activeSession: "",
					plate: ""
				});
				localStorage.setItem("users", users);
			}
		}
	};

	const onFailure = (res) => {
		console.log("Login failed: res:", res);
	};

	return (
		<div>
			<GoogleLogin
				clientId={clientId}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={"single_host_origin"}
				style={{ marginTop: "100px" }}
				isSignedIn={true}
			/>
		</div>
	);
};
export default GmailLogin;
