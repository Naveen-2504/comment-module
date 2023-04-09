import styles from "@/styles/Home.module.css";
import {
  AsideContainer,
  FigureContainer,
  FontContainer,
} from "@/styles/components";
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
      <AsideContainer>
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
      </AsideContainer>
      <section>
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
                margin: "0px 12px",
                color: "hsl(211, 10%, 45%)",
              }}
            >
              {timeDiff(moment(), props?.createdAt)}
            </FontContainer>
          </figcaption>
        </FigureContainer>
        <p style={{ marginTop: 20 }}>
          {props?.replyingTo && (
            <FontContainer
              style={{
                color: "hsl(238, 40%, 52%)",
                fontWeight: 500,
              }}
            >
              @{props?.replyingTo + "  "}
            </FontContainer>
          )}
          {props?.content}
        </p>
      </section>
      <section>
        <FigureContainer
          style={{
            cursor:
              replayIndex?.index === index && replayBtn
                ? "not-allowed"
                : "pointer",
          }}
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
        </FigureContainer>
      </section>
    </>
  );
};
