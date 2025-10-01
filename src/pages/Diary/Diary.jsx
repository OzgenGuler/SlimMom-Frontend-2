import { useEffect, useState, forwardRef } from "react";
import styles from "./Diary.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import {
  getSelectedDateDiary,
  getTodayDiary,
} from "../../redux/userDiary/operations.js";
export default function Diary({
  products = [],
  date = new Date(),

  onAddClick,
  onAdd,
  onDelete,
  onDateChange,
}) {
  // Tarih (controlled/uncontrolled destekli)
  const [productList] = useState([]);
  const [localDate, setLocalDate] = useState(date);

  const { selectedDate_Data: PrivateData } = useSelector(
    (state) => state.userDiary
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSelectedDateDiary(localDate));
  }, [localDate, dispatch]);

  const currentDate = onDateChange ? new Date() : localDate;

  const handleDatePick = (d) => {
    if (!d) return;
    if (typeof onDateChange === "function") onDateChange(d);
    else setLocalDate(d);
  };

  // Takvim ikon butonu
  const CalendarIconBtn = forwardRef(function CalendarIconBtn(
    { onClick },
    ref
  ) {
    return (
      <button
        type="button"
        className={styles.CalendarIconBtn}
        aria-label="Pick a date"
        onClick={onClick}
        ref={ref}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          className={styles.CalendarIcon}
          aria-hidden="true"
        >
          <path
            d="M7 10h5v5H7v-5zm10-6h-1V2h-2v2H10V2H8v2H7c-1.1 0-1.99.9-1.99 2L5 20c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H7V9h12v11z"
            fill="currentColor"
          />
        </svg>
      </button>
    );
  });

  const fmtDate = (d) => {
    const dd = new Date(d);
    const day = String(dd.getDate()).padStart(2, "0");
    const mon = String(dd.getMonth() + 1).padStart(2, "0");
    const year = dd.getFullYear();
    return `${day}.${mon}.${year}`;
  };

  const itemKcal = (p) => {
    if (typeof p.kcal === "number") return p.kcal;
    if (typeof p.kcalPer100 === "number" && typeof p.grams === "number") {
      return Math.round((p.grams / 100) * p.kcalPer100);
    }
    return 0;
  };

  const consumed = PrivateData.consumed;
  const left = PrivateData.left;
  const percent = PrivateData.nOfNormal;
  const dailyRate = PrivateData.dailyRate;

  const AddSchema = Yup.object({
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

  return (
    <div className={styles.DiaryPage}>
      {/* Toast container */}

      <ToastContainer position="top-center" autoClose={2500} />

      {/* Content */}
      <div className={styles.DiaryContent}>
        <h3 className={styles.DiaryDate}>
          {fmtDate(currentDate)}
          <DatePicker
            selected={currentDate}
            onChange={handleDatePick}
            customInput={<CalendarIconBtn />}
            popperPlacement="bottom-start"
            showPopperArrow
            calendarClassName={styles.GrayCalendar}
            dayClassName={() => styles.GrayCalendarDay}
            popperClassName={styles.GrayCalendarPopper}
          />
        </h3>

        {/* TABLET & DESKTOP inline add (Formik + Toastify) */}
        <Formik
          initialValues={{ name: "", weight: "" }}
          validationSchema={AddSchema}
          onSubmit={(vals, { resetForm }) => {
            const gramsNumber =
              typeof vals.grams === "number"
                ? vals.grams
                : parseFloat(String(vals.grams).replace(",", "."));
            onAdd?.({ name: vals.name.trim(), grams: gramsNumber });

            resetForm();
          }}
          validateOnBlur
          validateOnChange={false}
        >
          {({
            setFieldValue,
            validateForm,
            submitForm,
            isSubmitting,
            values,
          }) => {
            const handleAddClick = async () => {
              const errs = await validateForm();
              const keys = Object.keys(errs);
              if (keys.length) {
                const messages = keys.map((k) => errs[k]);
                toast.error(messages.join(" • "));
                return;
              }
              await submitForm();
              toast.success("Added ✔");
            };

            return (
              <Form className={styles.AddRow} noValidate>
                <Select
                  options={productList}
                  name="name"
                  className={styles.AddName}
                  value={
                    productList.find((opt) => opt.value === values.name) || null
                  }
                  onChange={(option) => setFieldValue("name", option.value)}
                />
                <Field
                  name="weight"
                  type="text" // virgül desteği
                  className={styles.AddGrams}
                  placeholder="Enter Weight"
                />
                <button
                  type="button"
                  className={styles.AddBtn}
                  aria-label="Add"
                  onClick={handleAddClick}
                  disabled={isSubmitting}
                >
                  +
                </button>
              </Form>
            );
          }}
        </Formik>

        <ul className={styles.DiaryList}>
          {products.map((p, i) => (
            <li className={styles.DiaryItem} key={`${p.name}-${i}`}>
              <span className={styles.DiaryItemName}>{p.name}</span>
              <span className={styles.DiaryItemGrams}>
                {typeof p.grams === "number" ? p.grams : "--"} g
              </span>
              <div className={styles.DiaryItemKcalBox}>
                <span className={styles.DiaryItemKcal}>{itemKcal(p)}</span>
                <span className={styles.DiaryItemKcalUnit}>kcal</span>
              </div>
              <button
                type="button"
                className={styles.DiaryDeleteBtn}
                aria-label={`Delete ${p.name}`}
                onClick={() => onDelete?.(i)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* MOBİL FAB */}
      <div className={styles.DiaryFabDiv}>
        <button
          type="button"
          className={styles.DiaryFab}
          aria-label="Add"
          onClick={onAddClick}
        >
          +
        </button>
      </div>

      {/* Summary */}
      <div className={styles.DiarySummary}>
        {/* SOL sütun */}
        <div className={styles.SummaryBox}>
          <h4>Summary for {fmtDate(currentDate)}</h4>
          <ul className={styles.SummaryList}>
            <li>
              <span>Left</span>
              <span>{left} kcal</span>
            </li>
            <li>
              <span>Consumed</span>
              <span>{consumed} kcal</span>
            </li>
            <li>
              <span>Daily rate</span>
              <span>{dailyRate} kcal</span>
            </li>
            <li>
              <span>n% of normal</span>
              <span>{percent}%</span>
            </li>
          </ul>
        </div>

        {/* SAĞ sütun */}
        <div className={styles.FoodBox}>
          <h4>Food not recommended</h4>
          <ul className={styles.FoodBoxList}>
            {PrivateData.notAllowedProducts.length > 0 &&
              PrivateData.notAllowedProducts.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
