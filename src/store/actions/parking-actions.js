export const CAR_PARKED = "CAR_PARKED";
export const PAY_PARKING = "PAY_PARKING";
export const SHOW_PARKING_POP_UP = "SHOW_PARKING_POP_UP";

export const payParking = (payParking) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: PAY_PARKING,
				payParking
			});
		} catch (error) {
			console.log(error);
		}
	};
};
export const carParked = (carParked) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: CAR_PARKED,
				carParked
			});
		} catch (error) {
			console.log(error);
		}
	};
};
export const showParkingPopUp = (showParkingPopUp) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: SHOW_PARKING_POP_UP,
				showParkingPopUp
			});
		} catch (error) {
			console.log(error);
		}
	};
};
