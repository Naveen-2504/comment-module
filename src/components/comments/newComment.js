import styles from "@/styles/Home.module.css";
import Image from "next/image";

export const CreateComment = ({
  props,
  handleChange,
  index,
  commentIndex,
  value,
  btnName,
  onClick,
}) => {
  const { currentUser } = props;
  return (
    <>
      <Image
        src={currentUser.image.png}
        alt={currentUser.username}
        width={40}
        height={40}
      />
      <textarea
        className={styles.textarea}
        placeholder="Add a comment..."
        name="user_content"
        onChange={(e) => handleChange(e, commentIndex, index)}
        value={value}
      />
      <button
        onClick={(e) => onClick(e)}
        style={{ padding: "10px 20px", fontSize: 16 }}
      >
        {btnName || "SEND"}
      </button>
    </>
  );
};
