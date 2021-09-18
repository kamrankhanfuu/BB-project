import * as handler from "./handler";

import {
    GET_SEARCH_COUNTRY,
    GET_SEARCH_PRODUCT,
    POST_SIGNUP,
    GET_USER,
    POST_ORDER,
    GET_ORDERHISTORY,
    VERIFY_PHONE,
    FORGOT_PASSWORD,
    RESET_PASSWORD
} from "./path";

const searchProducts = (state, category) =>
    handler.get(GET_SEARCH_PRODUCT + state + "/" + category).then((res) => {
        //console.log(res);
        return res;
    });
const getCountry = (params) =>
    handler.get(GET_SEARCH_COUNTRY + params, params).then((res) => {
        //console.log(res);
        return res;
    });
const register = (payload) =>
    handler.post(POST_SIGNUP, payload).then((res) => {
        return res;
    })

const getUser = (payload) =>
    handler.post(GET_USER, payload).then((res) => {
        return res;
    });
const postOrder = (payload) =>
    handler.post(POST_ORDER, payload).then((res) => {
        return res;
    });
const orderHistory = (params) =>
    handler.get(GET_ORDERHISTORY + params, params).then((res) => {

        return res;
    });
const verifyPhone = (payload) =>
    handler.post(VERIFY_PHONE, payload).then((res) => {
        return res;
    });
const forgotPassword = (params) =>
    handler.get(FORGOT_PASSWORD + params, null).then((res) => {

        return res;
    });
const resetPassword = (password, code, userid) =>
    handler.get(RESET_PASSWORD + password + "/" + code + "/" + userid, null).then((res) => {

        return res;
    });




export default {
    searchProducts,
    getCountry,
    register,
    getUser,
    postOrder,
    orderHistory,
    verifyPhone,
    forgotPassword,
    resetPassword

};