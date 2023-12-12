export const getCoursesAndAuthorsList = (state) => [
	state.coursesReducer,
	state.authorsReducer,
];
export const getAuthors = (state) => state.authorsReducer;
export const getUsersStore = (state) => state.userReducer;
