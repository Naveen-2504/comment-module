import styles from "@/styles/Home.module.css";
import { timeDiff } from "@/utilis.js/time";
import moment from "moment";
import Image from "next/image";

export const CommentsSection = ({
  props,
  onSubmitScore,
  comment_id,
  submitReplayScore,
  handleReplay,
  index,
  replayBtn,
  replayIndex,
}) => {
  let onClick = comment_id ? submitReplayScore : onSubmitScore;
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
          onClick={() => onClick({ id: props.id, comment_id }, "like")}
          style={{ cursor: "pointer" }}
        />
        <p>{props?.score}</p>
        <Image
          src="/images/icon-minus.svg"
          alt="mins"
          width={20}
          height={5}
          onClick={() => onClick({ id: props.id, comment_id })}
          style={{ cursor: "pointer" }}
        />
      </aside>
      <section>
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
                fontFamily: "'Rubik', sans-serif",
                margin: "0px 12px",
                color: "hsl(211, 10%, 45%)",
              }}
            >
             {timeDiff(moment(), props?.createdAt)}
            </span>
          </figcaption>
        </figure>
        <p style={{ marginTop: 20 }}>
          {props?.replyingTo && (
            <span
              style={{
                color: "hsl(238, 40%, 52%)",
                fontFamily: "'Rubik', sans-serif",
                fontWeight: 500,
              }}
            >
              @{props?.replyingTo + "  "}
            </span>
          )}
          {props?.content}
        </p>
      </section>
      <section>
        <figure
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor:
              replayIndex?.index === index && replayBtn
                ? "not-allowed"
                : "pointer",
          }}
          className={styles.gridItem}
          onClick={() => {
            replayIndex?.index === index && replayBtn
              ? {}
              : handleReplay({ index });
          }}
        >
          <Image
            src={"/images/icon-reply.svg"}
            alt={"reply"}
            width={15}
            height={15}
          />
          <figcaption
            style={{
              fontFamily: "'Rubik', sans-serif",
              fontWeight: 500,
              color:
                replayIndex?.index === index && replayBtn
                  ? "hsl(223, 19%, 93%)"
                  : "hsl(238, 40%, 52%)",
            }}
          >
            Replay
          </figcaption>
        </figure>
      </section>
    </>
  );
};
