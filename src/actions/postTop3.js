import {
    POST_TOP3_SUCCESS,
    POST_TOP3_FAIL, SET_MESSAGE
} from "./types";

import personService from "../services/person.service";

export const postTop3 = (keuze1, keuze2, keuze3, mail) => (dispatch) => {
    return personService.postTop3(keuze1,keuze2,keuze3, mail).then(
        (response) => {
            dispatch({
                type: POST_TOP3_SUCCESS,
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
                type: POST_TOP3_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
