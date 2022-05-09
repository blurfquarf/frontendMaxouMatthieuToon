import {
    CAMPUS_SUBJECT_SUCCESS,
    CAMPUS_SUBJECT_FAIL, SET_MESSAGE
} from "./types";

import subjectService from "../services/subject.service";

export const campusSubject = (campussen, title) => (dispatch) => {
    return subjectService.postCampusSubject(campussen, title).then(
        (response) => {
            dispatch({
                type: CAMPUS_SUBJECT_SUCCESS,
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
                type: CAMPUS_SUBJECT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
