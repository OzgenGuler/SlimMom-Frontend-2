import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publicCalculator } from "../../redux/publicCalculator/operations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import ResultModal from "../../components/ResultModal/ResultModal";

// Styles
import styles from "./PublicCalculator.module.css";

const PublicCalculator = () => {
  const dispatch = useDispatch();
  const { isRefreshing, data: PublicData } = useSelector(
    (state) => state.publicCalculator
  );
  const [formData, setFormData] = useState({
    height: "",
    age: "",
    currentWeight: "",
    desiredWeight: "",
    bloodType: "1",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    dispatch(publicCalculator(formData));
    // Form submit logic here
  };

  return (
    <div className={styles.contentWrapper}>
      <ToastContainer position="bottom-right" autoClose={2500} />
      {/* Form Section */}
      <section className={styles.formSection}>
        <h1 className={styles.title}>
          Calculate your daily calorie intake right now
        </h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputField}>
              <label htmlFor="height">Height *</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputField}>
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputField}>
              <label htmlFor="currentWeight">Current weight *</label>
              <input
                type="number"
                id="currentWeight"
                name="currentWeight"
                value={formData.currentWeight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputField}>
              <label htmlFor="desiredWeight">Desired weight *</label>
              <input
                type="number"
                id="desiredWeight"
                name="desiredWeight"
                value={formData.desiredWeight}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.radioField}>
              <label>Blood type *</label>
              <div className={styles.radioOptions}>
                {["1", "2", "3", "4"].map((type) => (
                  <label key={type} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="bloodType"
                      value={type}
                      checked={formData.bloodType === type}
                      onChange={handleInputChange}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            {isRefreshing ? "Calculating..." : "Start losing weight"}
          </button>
        </form>
      </section>
      {PublicData.calorie !== null && <ResultModal data={PublicData} />}
    </div>
  );
};

export default PublicCalculator;
