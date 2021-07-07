import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
	const history = useHistory();
	const [signUpData, setsignUpData] = useState({
		name: "",
		email: "",
		password: ""
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [emailError, setEmailError] = useState(false);
	const [errorPassword, setErrorPassword] = useState(false);
	const [emptyError, setEmptyError] = useState(false);
	const [usernameExists, setUsernameExists] = useState(false);
	const [newUser, setNewUser] = useState({
		name: "",
		email: "",
		password: "",
		history: "",
		activeSession: "",
		plate: ""
	});
	const verifyEmail = (email) => {
		if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
			setEmailError(true);
			return true;
		} else {
			setEmailError(false);
		}
	};

	const verifyIfUsernameExists = (credentials) => {
		credentials.forEach((cred) => {
			if (cred.email === signUpData.email) {
				setUsernameExists(true);
			}
		});
	};

	const updateDataHandler = (value, name) => {
		let dataItem = JSON.parse(JSON.stringify(signUpData));
		dataItem[name] = value;

		//update newUser
		let newUserLocal = JSON.parse(JSON.stringify(newUser));
		if (newUserLocal[name] !== undefined) {
			newUserLocal[name] = value;
			setNewUser(newUserLocal);
		}
		setsignUpData(dataItem);
	};

	const updateUsers = () => {
		let users = JSON.parse(localStorage.getItem("users"));

		if (users === null) {
			localStorage.setItem("users", JSON.stringify([newUser]));
		} else {
			users.push(newUser);
			localStorage.setItem("users", JSON.stringify(users));
		}
	};

	const createAccountHandler = (e) => {
		e.preventDefault();
		for (let key in signUpData) {
			if (signUpData[key].length === 0) {
				setEmptyError(true);
				return;
			} else {
				setEmptyError(false);
			}
		}
		verifyEmail(signUpData.email);
		if (emailError) {
			return;
		}
		if (signUpData.password !== confirmPassword) {
			setErrorPassword(true);
			return;
		}

		let credentials = JSON.parse(localStorage.getItem("credentials"));
		if (credentials === null) {
			localStorage.setItem("credentials", JSON.stringify([signUpData]));
			updateUsers();
			if (props.location.state !== undefined) {
				history.push(props.location.state.path);
			} else {
				history.push("/");
			}
		} else {
			verifyIfUsernameExists(credentials);
			if (usernameExists) {
				return;
			}
			credentials.push(signUpData);
			localStorage.setItem("credentials", JSON.stringify(credentials));
			updateUsers();
			if (props.location.state !== undefined) {
				history.push(props.location.state.path);
			} else {
				history.push("/");
			}
		}
	};
	return (
		<div className={"containerSign"}>
			<div
				className={
					"flex flex-col bg-gray-100 p-4 rounded-lg md:w-6/12 lg:w-4/12 w-10/12  text-sm shadow-lg"
				}
			>
				<form className={"flex flex-col justify-between"} name="loginForm">
					<input
						type={"text"}
						placeholder="Name"
						className={"rounded-lg my-2 p-3 "}
						name="name"
						value={signUpData.name}
						onChange={(event) => updateDataHandler(event.target.value, "name")}
					/>
					<input
						type={"text"}
						placeholder="Email"
						className={
							"rounded-lg my-2 p-3 " +
							(emailError ? "border border-red-500" : "")
						}
						name="email"
						value={signUpData.email}
						onChange={(event) => {
							updateDataHandler(event.target.value, "email");
							verifyEmail(event.target.value);
						}}
					/>
					<input
						type={"password"}
						placeholder="Password"
						className={
							"rounded-lg my-2 p-3 " +
							(errorPassword ? "border border-red-500" : "")
						}
						name="password"
						value={signUpData.password}
						onChange={(event) =>
							updateDataHandler(event.target.value, "password")
						}
					/>
					<input
						type={"password"}
						placeholder="Confirm Password"
						className={
							"rounded-lg my-2 p-3 " +
							(errorPassword ? "border border-red-500" : "")
						}
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
					/>

					{emptyError ? (
						<span className={"error_message"}>Please fill all fields!</span>
					) : null}
					{emailError ? (
						<span className={"error_message"}>
							Please insert a valid email address!
						</span>
					) : null}
					{errorPassword ? (
						<span className={"error_message"}>Passwords don't match!</span>
					) : null}
					{usernameExists ? (
						<span className={"error_message"}>This username is taken</span>
					) : null}
					<div className={"flex flex-col justify-between"}>
						<button
							className={"button bgSuccess"}
							onClick={createAccountHandler}
						>
							Sign Up
						</button>
						<span
							onClick={() =>
								props.history.push("/signin", {
									path: props.location.state.path
								})
							}
							className={
								"self-center text-gray-700 mt-4 flex cursor-pointer uppercase text-xs"
							}
						>
							Already have an account? - Login!
						</span>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
