export const SAVE_USER = "SAVE_USER";

export const saveUser = (user) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: SAVE_USER,
				user
			});
		} catch (error) {
			console.log(error);
		}
	};
};
