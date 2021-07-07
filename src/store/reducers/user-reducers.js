import { SAVE_USER } from "../actions/users-action";

const initialState = {
	user: {}
};

const userReducers = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_USER:
			let user = action.user;
			return {
				...state,
				user
			};

		default:
			return state;
	}
};

export default userReducers;
