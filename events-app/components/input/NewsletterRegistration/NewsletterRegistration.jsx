import { useRef } from "react";
import styles from "./NewsletterRegistration.module.css";

export default function NewsletterRegistration() {
  const emailRef = useRef();

  function onRegister(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const newReqEmail = { email };

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(newReqEmail),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        emailRef.current.value = "";
      });
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={onRegister}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailRef}
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}
