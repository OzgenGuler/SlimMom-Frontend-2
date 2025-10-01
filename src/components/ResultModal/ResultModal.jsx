import styles from "./ResultModal.module.css";
import { useDispatch } from "react-redux";
import { resetData as resetPublicCal } from "../../redux/publicCalculator/actions.js";
import { resetData as resetUserData } from "../../redux/userDiary/actions.js";
const ResultModal = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.resultModalContainer}>
      <p className={styles.resultModalText}>
        Your recommended daily calorie intake is
      </p>
      <p className={styles.resultModalKcal}>
        {data ? data.calorie || data.dailyRate : 0}{" "}
        <span className={styles.resultModalKcalSpan}> kcal</span>
      </p>
      <div className={styles.FoodContainer}>
        <h4 className={styles.FoodListTitle}>Foods you should not eat</h4>
        <ul className={styles.FoodList}>
          {data.notAllowedProducts.map((item, index) => (
            <li key={index} className={styles.FoodListItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button
        className={styles.ModalBtn}
        onClick={() => {
          dispatch(resetPublicCal());
          dispatch(resetUserData());
        }}
      >
        Start losing weight
      </button>
    </div>
  );
};

export default ResultModal;
