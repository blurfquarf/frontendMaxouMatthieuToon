import {
    COPRO_SUBJECT_SUCCESS,
    COPRO_SUBJECT_FAIL, SET_MESSAGE
} from "./types";

import subjectService from "../services/subject.service";

export const coProsSubject = (coProMail, title) => (dispatch) => {
    return subjectService.postCoProSubject(coProMail, title).then(
        (response) => {
            dispatch({
                type: COPRO_SUBJECT_SUCCESS,
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
                type: COPRO_SUBJECT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
