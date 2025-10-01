import styles from "../../pages/Diary/Diary.module.css";
const CalendarIconBtn = () => {
  return (
    <button
      type="button"
      className={styles.CalendarIconBtn}
      aria-label="Pick a date"
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
};

export default CalendarIconBtn;
