import {
	COURSES_GET_COURSE,
	COURSES_SAVE_NEW_COURSE,
	COURSES_DELETE_COURSE,
} from '../courses/actionTypes';
import { coursesReducer, initialState } from '../courses/reducer';

import { mockedState } from '../../mockedData';

describe('courses reducer test', () => {
	it('should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual(initialState);
	});
	it('should save course', () => {
		expect(
			coursesReducer([], {
				type: COURSES_SAVE_NEW_COURSE,
				payload: mockedState.courses[0],
			})
		).toEqual([...initialState, mockedState.courses[0]]);
	});
	it('should delete course', () => {
		expect(
			coursesReducer(undefined, {
				type: COURSES_DELETE_COURSE,
				payload: '2e65ea42-fd68-4a29-ad71-89af8c9214da',
			})
		).toEqual([]);
	});
	it('should get courses', () => {
		expect(
			coursesReducer(undefined, {
				type: COURSES_GET_COURSE,
				payload: mockedState.courses,
			})
		).toEqual(mockedState.courses);
	});
});
