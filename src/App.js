import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";

import ProtectedRoute from "./components/shared/Protected-Route";

import GMaps from "./Views/G-maps";
import History from "./Views/History";
import Profile from "./Views/Profile";
import SignIn from "./Views/SignIn";
import SignUp from "./Views/SignUp";

import Menu from "./components/shared/Menu";
const App = (props) => {
	return (
		<div className="App">
			<Menu />
			<Switch>
				{/* <Route path="/" component={Load_test} /> */}
				<ProtectedRoute exact path="/" component={GMaps} />
				<ProtectedRoute path="/history" component={History} />
				<ProtectedRoute path="/profile" component={Profile} />
				<Route path="/signin" component={SignIn} />
				<Route path="/signup" component={SignUp} />
			</Switch>
		</div>
	);
};

export default withRouter(App);
