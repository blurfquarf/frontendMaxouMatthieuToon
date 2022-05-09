import {
    JUDGE_SUBJECT_SUCCESS,
    JUDGE_SUBJECT_FAIL, SET_MESSAGE
} from "./types";

import subjectService from "../services/subject.service";

export const judgeSubject = (title) => (dispatch) => {
    console.log("approveeeeee");
    return subjectService.postApprovedSubject(title).then(
        (response) => {
            dispatch({
                type: JUDGE_SUBJECT_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });
            console.log("approveeeeee");

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
                type: JUDGE_SUBJECT_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            console.log("approveeeeee");

            return Promise.reject();
        }
    );
};
