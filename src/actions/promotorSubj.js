import {
    PRO_SUBJECT_SUCCESS,
    PRO_SUBJECT_FAIL, SET_MESSAGE
} from "./types";

import subjectService from "../services/subject.service";

export const promotorSubject = (title, proMail) => (dispatch) => {
    return subjectService.postProSubject(title, proMail).then(
        (response) => {
            dispatch({
                type: PRO_SUBJECT_SUCCESS,
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
                type: PRO_SUBJECT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
