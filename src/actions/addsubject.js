import {
    ADD_SUBJECT_SUCCESS,
    ADD_SUBJECT_FAIL, SET_MESSAGE
} from "./types";

import subjectService from "../services/subject.service";

export const addSubject = (title, description) => (dispatch) => {
    return subjectService.postSubject(title, description).then(
        (response) => {
            dispatch({
                type: ADD_SUBJECT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: ADD_SUBJECT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
