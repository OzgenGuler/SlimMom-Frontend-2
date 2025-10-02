import { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./GramCalc.module.css";

import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/userDiary/operations";
const GramCalc = ({ view }) => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const Schema = Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Please enter at least 2 characters.")
      .required("Please enter at least 2 characters."),
    grams: Yup.number()
      .transform((val, orig) => {
        if (typeof orig === "string") {
          const n = parseFloat(orig.replace(",", "."));
          return Number.isNaN(n) ? val : n;
        }
        return val;
      })
      .typeError("Please enter a positive number.")
      .positive("Please enter a positive number.")
      .required("Please enter a positive number."),
  });
  if (!view) return null;
  return (
    <div className={styles.Page}>
      {/* Toasts */}
      <ToastContainer position="bottom-right" autoClose={2500} />
      {/* Formik + Toastify */}
      <Formik
        initialValues={{ name: "", grams: "" }}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
           

          setSubmitting(false);
          resetForm();
          nameRef.current?.focus();
          toast.success("Added ✔");
        }}
        validateOnChange={false}
        validateOnBlur
      >
        {({
          validateForm,
          
          values,
          setFieldValue,
        }) => {
          const handleAddClick = async () => {
            const errs = await validateForm();
            const keys = Object.keys(errs);
            if (keys.length) {
              const messages = keys.map((k) => errs[k]);
              toast.error(messages.join(" • "));
              return;
            }
            dispatch(
              addProduct({
                name: values.name,
                weight: values.weight,
              })
            );
          };

          return (
            <Form className={styles.Form} noValidate>
              <label className={styles.Label} htmlFor="name"></label>
              <Field
                id="name"
                name="name"
                innerRef={nameRef}
                placeholder="Enter product name"
                className={styles.Input}
              />

              <label className={styles.Label} htmlFor="grams"></label>
              <Field
                id="grams"
                name="weight"
                type="text"
                placeholder="Grams"
                className={styles.Input}
                onChange={(e) => {
                  const v = e.target.value;
                  setFieldValue("grams", v);
                }}
              />

              <button
                type="button"
                className={styles.AddBtn}
                onClick={handleAddClick}
              >
                Add{" "}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default GramCalc;
