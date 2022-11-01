import axios from "axios";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import heroImage from "../assets/hero-bg.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";


// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
});

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/");
    }
  }, [navigate])


  //login handler
  const loginHandler = async (values) => {
    console.log(values);
    try {
      const result = await axios.post('https://reqres.in/api/login', {
        email: values?.email,
        password: values?.password
      });
      if (result?.data?.token) {
        setAuth(true);
        toast.success("You have been Successfully login.");
        if (rememberMe){
          localStorage.setItem('token', `${result?.data?.token}`);
        }
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => { loginHandler(values) }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <div className="login" style={{ height: "100vh", backgroundColor: "#040d21" }}>
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-12 col-md-6">
                  <img src={heroImage} id="heroImg" alt="heroimage" title="hero image" className="w-100 h-100" />
                </div>
                <div className="form col-12 col-md-6 d-flex align-items-center justify-content-center">
                  {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                  <form noValidate onSubmit={handleSubmit}>
                    <h1 className="text-light mt-3" >Welcome to Rest Countries</h1>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <h3 className="text-secondary mb-3 text-center" style={{ marginTop: "15vh" }}>Login to continue</h3>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      placeholder="Enter email id / username"
                      className="form-control inp_text w-75 m-auto"
                      id="email"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="error text-danger">
                      {errors.email && touched.email && errors.email}
                    </p>
                    {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Enter password"
                      className="form-control w-75 mt-4 m-auto"
                    />
                    {/* If validation is not passed show errors */}
                    <p className="error text-danger">
                      {errors.password && touched.password && errors.password}
                    </p>
                    <div className="d-flex justify-content-around align-items-center">
                      <label>
                        <input type="checkbox" name="rememberMe" onChange={() => setRememberMe(!rememberMe)} className="form-check-input" />
                        <span className="text-light"> Remember Me</span><br/>
                      </label>
                    </div>
                    {/* Click on submit button to submit the form */}
                    <button type="submit" className="btn btn-outline-light px-5 m-auto mt-3">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
