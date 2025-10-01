import styles from "./Page.module.css";
import Header from "../components/Header/Header";
const Page = ({ children }) => {
  return (
    <div className={styles.PageContainer}>
      <Header />
      <div className={styles.Spacer}>{children}</div>
    </div>
  );
};

export default Page;
