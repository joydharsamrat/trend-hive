import styles from "./loader.module.css";

const Spinner = () => {
  return (
    <div className="h-screen grid place-items-center">
      <div className={styles.loader}></div>
    </div>
  );
};

export default Spinner;
