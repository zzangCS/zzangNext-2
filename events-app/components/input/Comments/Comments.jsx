import { useState, useEffect, useContext } from "react";
import styles from "./Comments.module.css";
import { NotificationContext } from "@/store/notificationContext";
import CommentList from "../CommentList/CommentList";
import NewComment from "../NewComment/NewComment";

export default function Comments({ eventId }) {
  const { showNotification } = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    /**
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
        });
     }
     */
  }

  async function addComment(commentData) {
    showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
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
        showNotification({
          title: "Success!",
          message: "Successfully inserted Comment!",
          status: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addComment} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}
