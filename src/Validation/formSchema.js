import * as Yup from 'yup';

export default  Yup.object().shape({
    name: Yup
        .string()
        .required("Name is required.")
        .min(2, "Name must be 2 characters long."),
    email: Yup
        .string()
        .email("Submit a valid Email.")
        .required("Email is required."),
    password: Yup
        .string()
        .required("Password is required.")
        .min(6, "Password must be 6 characters long."),
    tos: Yup.boolean()
        .required("Accept Terms of Service")
});