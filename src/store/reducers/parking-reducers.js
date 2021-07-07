import {
	PAY_PARKING,
	CAR_PARKED,
	SHOW_PARKING_POP_UP
} from "../actions/parking-actions";

const initialState = {
	payParking: false,
	carParked: false,
	showParkingPopUp: false
};

const userReducers = (state = initialState, action) => {
	switch (action.type) {
		case PAY_PARKING:
			let payParking = action.payParking;
			return {
				...state,
				payParking
			};
		case CAR_PARKED:
			let carParked = action.carParked;
			return {
				...state,
				carParked
			};
		case SHOW_PARKING_POP_UP:
			let showParkingPopUp = action.showParkingPopUp;
			return {
				...state,
				showParkingPopUp
			};
		default:
			return state;
	}
};

export default userReducers;
