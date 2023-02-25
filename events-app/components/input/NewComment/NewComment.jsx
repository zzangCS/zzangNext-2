import { useRef, useState } from "react";
import styles from "./NewComment.module.css";

export default function NewComment({ onAddComment }) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailRef = useRef();
  const nameRef = useRef();
  const commentRef = useRef();

  function sendComment(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const text = commentRef.current.value;

    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    onAddComment({ email, name, text });

    emailRef.current.value = "";
    nameRef.current.value = "";
    commentRef.current.value = "";
  }

  return (
    <form className={styles.form} onSubmit={sendComment}>
      <div className={styles.row}>
        <div className={styles.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameRef} />
        </div>
      </div>
      <div className={styles.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button type='submit'>Submit</button>
    </form>
  );
}
