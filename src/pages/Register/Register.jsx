import styles from "./Register.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/auth/operations.js";

const Register = () => {
  const dispatch = useDispatch();

  // Yup şeması
  const Schema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .required("Name is required."),
    email: Yup.string()
      .trim()
      .email("Please enter a valid email.")
      .required("Email is required."),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters.")
      .required("Password is required."),
  });

  return (
    <div className={styles.registrationWrap}>
      {/* Toasts */}
      <ToastContainer position="bottom-right" autoClose={2500} />
      {/* FORM */}
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={Schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            dispatch(
              registerUser({
                username: values.name.trim(),
                email: values.email.trim(),
                password: values.password,
              })
            );

            // resetForm();
          } catch (err) {
            // Backend hatası vs.
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
        validateOnChange={false}
        validateOnBlur
      >
        {({ validateForm, submitForm, isSubmitting }) => {
          const handleRegisterClick = async () => {
            const errs = await validateForm();
            const keys = Object.keys(errs);
            if (keys.length) {
              const messages = keys.map((k) => errs[k]);
              messages.forEach((m) => toast.error(m));
              return;
            }
            await submitForm();
          };

          return (
            <Form className={styles.registrationForm} noValidate>
              <h2 className={styles.registrationTitle}>REGISTER</h2>

              <label className={styles.registrationLabel} htmlFor="name">
                Name *
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className={styles.registrationInput}
                placeholder="Your name"
              />

              <label className={styles.registrationLabel} htmlFor="email">
                Email *
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={styles.registrationInput}
                placeholder="you@example.com"
              />

              <label className={styles.registrationLabel} htmlFor="password">
                Password *
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className={styles.registrationInput}
                placeholder="••••••••"
              />

              <div className={styles.registrationBtnAll}>
                <button
                  type="button"
                  className={styles.registrationPrimaryBtn}
                  onClick={handleRegisterClick}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>

                <button
                  type="button"
                  className={styles.registrationOutlineBtn}
                  onClick={() => window.location.replace("/login")}
                >
                  Log in
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
