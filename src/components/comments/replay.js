import styles from "@/styles/Home.module.css";
import {
  AsideContainer,
  FigureContainer,
  FontContainer,
} from "@/styles/components";
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
      <AsideContainer>
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
      </AsideContainer>
      <section>
        <section className={styles.replyContainer}>
          <FigureContainer>
            <Image
              src={props?.user?.image?.png}
              alt={props?.user?.username}
              width={35}
              height={35}
            />
            <figcaption>
              <FontContainer style={{ fontWeight: 700 }}>
                {props?.user?.username}
              </FontContainer>
              <FontContainer
                style={{
                  marginLeft: 12,
                  backgroundColor: "hsl(238, 40%, 52%)",
                  padding: "0px 6px",
                  color: "hsl(0, 0%, 100%)",
                  borderRadius: "2px",
                }}
              >
                you
              </FontContainer>
              <FontContainer
                style={{
                  margin: "0px 12px",
                  color: "hsl(211, 10%, 45%)",
                }}
              >
                {timeDiff(moment(), props?.createdAt)}
              </FontContainer>
            </figcaption>
          </FigureContainer>
          <section style={{ display: "flex", gap: 12 }}>
            <FigureContainer
              style={{
                cursor: "pointer",
              }}
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
            </FigureContainer>
            <FigureContainer
              style={{
                cursor: "pointer",
              }}
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
            </FigureContainer>
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
