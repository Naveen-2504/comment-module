import styles from "@/styles/Home.module.css";
import { timeDiff } from "@/utilis.js/time";
import moment from "moment";
import Image from "next/image";

export const CommentsReplay = ({
  props,
  submitReplayScore,
  comment_id,
  onClick,
  edit,
  handleChange,
  editOnSubmit,
  index,
  commentIndex,
  editIndex,
  handleDelete,
}) => {
  return (
    <>
      <aside
        style={{
          backgroundColor: "hsl(228, 33%, 97%)",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
          borderRadius: "8px",
        }}
        className={styles.gridItem}
      >
        <Image
          src="/images/icon-plus.svg"
          alt="add"
          width={20}
          height={20}
          style={{ cursor: "pointer" }}
          onClick={() =>
            submitReplayScore({ id: props.id, comment_id }, "like")
          }
        />
        <p>{props?.score}</p>
        <Image
          src="/images/icon-minus.svg"
          alt="add"
          width={20}
          height={5}
          style={{ cursor: "pointer" }}
          onClick={() => submitReplayScore({ id: props.id, comment_id })}
        />
      </aside>
      <section>
        <section className={styles.replyContainer}>
          <figure
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            className={styles.gridItem}
          >
            <Image
              src={props?.user?.image?.png}
              alt={props?.user?.username}
              width={35}
              height={35}
            />
            <figcaption>
              <span
                style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 700 }}
              >
                {props?.user?.username}
              </span>
              <span
                style={{
                  marginLeft: 12,
                  fontFamily: "'Rubik', sans-serif",
                  backgroundColor: "hsl(238, 40%, 52%)",
                  padding: "0px 6px",
                  color: "hsl(0, 0%, 100%)",
                  borderRadius: "2px",
                }}
              >
                you
              </span>
              <span
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  margin: "0px 12px",
                  color: "hsl(211, 10%, 45%)",
                }}
              >
                {timeDiff(moment(), props?.createdAt)}
              </span>
            </figcaption>
          </figure>
          <section style={{ display: "flex", gap: 12 }}>
            <figure
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
              className={styles.gridItem}
              onClick={() => handleDelete(comment_id, props.id)}
            >
              <Image
                src={"/images/icon-delete.svg"}
                alt={"reply"}
                width={15}
                height={15}
              />
              <figcaption
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: 500,
                  color: "hsl(358, 79%, 66%)",
                }}
              >
                Delete
              </figcaption>
            </figure>
            <figure
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
              className={styles.gridItem}
              onClick={() => onClick(index)}
            >
              <Image
                src={"/images/icon-edit.svg"}
                alt={"reply"}
                width={15}
                height={15}
              />
              <figcaption
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: 500,
                  color: "hsl(238, 40%, 52%)",
                }}
              >
                Edit
              </figcaption>
            </figure>
          </section>
        </section>
        {edit && editIndex === index ? (
          <section style={{ margin: "14px 0", textAlign: "end" }}>
            <textarea
              className={styles.textarea}
              placeholder="Add a comment..."
              value={props?.content}
              name="content"
              onChange={(e) => handleChange(e, commentIndex, index)}
            />
            <button
              style={{ padding: "10px 20px", fontSize: 16, marginTop: 12 }}
              onClick={(e) => editOnSubmit(e, index)}
            >
              UPDATE
            </button>
          </section>
        ) : (
          <p style={{ marginTop: 20 }}>
            {props?.replyingTo && (
              <span style={{ color: "hsl(238, 40%, 52%)" }}>
                @{props?.replyingTo + " "}{" "}
              </span>
            )}
            {props?.content}
          </p>
        )}
      </section>
    </>
  );
};
