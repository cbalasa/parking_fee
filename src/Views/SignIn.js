import React, { useState } from "react";
import * as userActions from "../store/actions/users-action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const SignIn = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [signInData, setSignInData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const signInHandler = (e) => {
		e.preventDefault();
		if (signInData.email.length === 0 || signInData.password.length === 0) {
			setError("Please insert your credentials!");
			return;
		}
		let credentials = JSON.parse(localStorage.getItem("credentials"));
		if (credentials === null) {
			setError("Username does not exist!");
		} else {
			let user = credentials.find(function (cred) {
				return (
					cred.email === signInData.email &&
					cred.password === signInData.password
				);
			});
			if (user == undefined) {
				return;
			}

			let users = JSON.parse(localStorage.getItem("users"));
			let currentUser = users.filter((usr) => usr.email === user.email)[0];
			dispatch(userActions.saveUser(currentUser))
				.then(() => {
					if (props.location.state !== undefined) {
						history.push(props.location.state.path);
					} else {
						history.push("/");
					}
				})
				.catch((err) => console.log(err));
		}
	};

	const updateDataHandler = (value, name) => {
		let dataItem = JSON.parse(JSON.stringify(signInData));
		dataItem[name] = value;
		setSignInData(dataItem);
	};

	return (
		<div className={"containerSign"}>
			<div
				className={
					"flex flex-col bg-gray-100 p-4 rounded-lg md:w-6/12 lg:w-4/12 w-10/12 text-sm shadow-lg"
				}
			>
				<div className={"p-4"}>Gmail</div>
				<div>or use email to login</div>
				<form className={"flex flex-col justify-between"} name="loginForm">
					<input
						type={"text"}
						placeholder="Email"
						className={"rounded-lg my-2 p-3 "}
						name="email"
						value={signInData.email}
						onChange={(event) => updateDataHandler(event.target.value, "email")}
					/>
					<input
						type={"password"}
						placeholder="Password"
						className={"rounded-lg my-2 p-3 "}
						name="password"
						value={signInData.password}
						onChange={(event) =>
							updateDataHandler(event.target.value, "password")
						}
					/>
					<span className={"error_message"}>{error}</span>
					<span className={"self-end text-gray-700 mt-2 cursor-pointer"}>
						Forgot your password?
					</span>
					<div className={"flex flex-col justify-between"}>
						<button className={" button bgSuccess"} onClick={signInHandler}>
							Sign In
						</button>
					</div>
				</form>
				<div className={"flex flex-col justify-between"}>
					<span
						onClick={() =>
							props.history.push("/signup", {
								path: props.location.state.path
							})
						}
						className={
							"font-bold self-center text-gray-700 mt-4 flex cursor-pointer uppercase text-xs"
						}
					>
						Don't have an account? - Register now!
					</span>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
