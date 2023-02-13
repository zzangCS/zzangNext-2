import React from "react";
import styles from "./ErrorAlert.module.css";

export default function ErrorAlert({ children }) {
  return <div className={styles.alert}>{children}</div>;
}
