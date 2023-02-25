import styles from "./CommentList.module.css";

export default function CommentList({ comments }) {
  return (
    <ul className={styles.comments}>
      {comments &&
        comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}
