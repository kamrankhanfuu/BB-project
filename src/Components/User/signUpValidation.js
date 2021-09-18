import * as yup from "yup" ;
export const userSchema = yup.object().shape({
    email: yup.string().email("Email must be equal to email pattern").required("Email is requaired"), 
    phoneNumber: yup.string().required("Phone number is required"), 
    password:yup.string().required("Password is required"),
    confpassword:yup.string().oneOf([yup.ref("password")], "Password doesn't match").required("Conform password is required"), 
     //country:yup.string().matches("+00", "Select country")
})