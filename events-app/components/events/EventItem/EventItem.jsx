import React from "react";
import styles from "./EventItem.module.css";
import Image from "next/image";
import Link from "next/link";

export default function EventItem({ title, date, image, location, id }) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");
  const exploreLint = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image src={`/${image}`} alt={title} width={500} height={500} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
        </div>
        <div className={styles.date}>
          <time>{humanReadableDate}</time>
        </div>
        <div className={styles.address}>
          <address>{formattedAddress}</address>
        </div>
        <div className={styles.actions}>
          <Link href={exploreLint}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}
