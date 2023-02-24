import { useRef, useState } from "react";

function HomePage() {
  const emailRef = useRef();
  const feedbackRef = useRef();
  const [feedbackItems, setFeedbackItems] = useState([]);

  const submitForm = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data)); // {email: 'test@test.com', text: 'Some feedback text}
  };

  const loadFeedback = () => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbackItems(data.feedback)); // {email: 'test@test.com', text: 'Some feedback text}
  };

  return (
    <div>
      <h1>The Home Page</h1>

      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackRef} />
        </div>

        <button type="submit">Send Feedback</button>
      </form>

      <hr />

      <button type="button" onClick={loadFeedback}>
        Load Feedback
      </button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
