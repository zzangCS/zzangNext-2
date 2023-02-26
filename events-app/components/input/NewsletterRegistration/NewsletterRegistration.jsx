import { NotificationContext } from "@/store/notificationContext";
import { useContext, useRef } from "react";
import styles from "./NewsletterRegistration.module.css";

export default function NewsletterRegistration() {
  const { showNotification } = useContext(NotificationContext);
  const emailRef = useRef();

  function onRegister(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const newReqEmail = { email };

    showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(newReqEmail),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(() => {
        emailRef.current.value = "";

        showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={onRegister}>
        <div className={styles.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button type='submit'>Register</button>
        </div>
      </form>
    </section>
  );
}
