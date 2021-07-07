import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...restOfProps }) {
	const user = useSelector((state) => state.user.user);
	return (
		<Route
			{...restOfProps}
			render={(props) =>
				user.email !== undefined ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/signin",
							state: { path: restOfProps.path }
						}}
					/>
				)
			}
		/>
	);
}

export default ProtectedRoute;
