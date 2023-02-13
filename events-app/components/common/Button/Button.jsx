import React from "react";
import Link from "next/link";
import styles from "./button.module.css";

export default function Button({ link, children }) {
  return (
    <Link className={styles.btn} href={link}>
      {children}
    </Link>
  );
}
