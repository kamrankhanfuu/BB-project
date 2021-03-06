import axios from "axios";
import { API_BASE_URL } from "../../Configs"; 
import Swal from "sweetalert2";

 

    
export  const  get =  (url, params) =>
 axios
  .get(API_BASE_URL + url, { params })
  .then((response) => response.data)
  .catch((error) => handleError(error));

export const post = (url, payload, config = {}) =>
axios
  .post(API_BASE_URL + url, payload, config)
  .then((response) => {
    return response.data;

  })
  .catch((error) => {
    return handleError(error);
  });

// Naming 'delete' is not a mistake
// 'delete' is reserved keyword we can not use.
export const delet = (url) =>
axios
  .delete(API_BASE_URL + url)
  .then((response) => response.data)
  .catch((error) => handleError(error));

export const put = (url, payload) =>
axios
  .put(API_BASE_URL + url, payload)
  .then((response) => {
    return response.data;
  })
  .catch((error) => handleError(error));

export const patch = (url, payload) =>
axios
  .patch(API_BASE_URL + url, payload)
  .then((response) => {
    return response.data;
  })
  .catch((error) => handleError(error));

export const handleError = (error) => {
const { response } = error;
if (response) {
  if (response.status === 500 || response.data.errors)
    Swal.fire({
      icon: "error",
      title: "Internal server Error, please contact your administrator",
    });
  else if (response.data && response.data.message)
    Swal.fire({
      icon: "error",
      title: response.data.message,
    });
  else if (
    response.data &&
    response.data.errors &&
    response.data.errors.length > 0
  )
    Swal.fire({
      icon: "error",
      title: response.data.errors[0].description,
    });
}
throw error;
};
