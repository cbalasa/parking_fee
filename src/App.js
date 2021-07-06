import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Switch>
				{/* <Route path="/" component={Load_test} /> */}
				<Route path="/vm11" />
			</Switch>
			<div>Template Loaded</div>
		</div>
	);
}

export default withRouter(App);
