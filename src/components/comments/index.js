import {
  createComment,
  getComments,
  updateComment,
  updateDislike,
  updateLike,
  updateReplayDislike,
  updateReplayLike,
} from "@/api/comments";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { CommentsSection } from "./section";
import { CommentsReplay } from "./replay";
import { CreateComment } from "./newComment";
import { deleteReplayDislike } from "@/api/comments";
import { GridContainer, ReplayContainer } from "@/styles/components";

export const Comments = () => {
  const [commentsData, setCommentsData] = useState();
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [replayBtn, setReplayBtn] = useState(false);
  const [replayIndex, setReplayIndex] = useState(false);
  const [deleteComment, setDeleteComment] = useState({});
  const [commentBox, setCommentBox] = useState({
    mainIndex: null,
    replayIndex: null,
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    getComments()
      .then((data) => {
        setCommentsData(data);
      })
      .catch((err) => console.log(err, "error"));
  };

  const onSubmitScore = (value, key) => {
    const method = key === "like" ? updateLike : updateDislike;
    method({ comment_id: value.id })
      .then((data) => {
        fetchComments();
      })
      .catch((err) => console.log(err, "error"));
  };

  const submitReplayScore = (ids, key) => {
    const method = key === "like" ? updateReplayLike : updateReplayDislike;
    method(ids)
      .then((data) => {
        fetchComments();
      })
      .catch((err) => console.log(err, "error"));
  };

  const onDeleteReplay = (comment_id, id) => {
    deleteReplayDislike(comment_id, { id })
      .then((data) => {
        fetchComments();
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e, commentIndex) => {
    const { name, value } = e.target;
    if (editIndex === 0 || editIndex) {
      const itemIndex = commentsData.comments.findIndex(
        (_, i) => i === commentIndex
      );
      const subItemIndex = commentsData.comments[itemIndex].replies.findIndex(
        (_, i) => i === editIndex
      );

      const updatedItems = [
        ...commentsData.comments.slice(0, itemIndex),
        {
          ...commentsData.comments[itemIndex],
          replies: [
            ...commentsData.comments[itemIndex].replies.slice(0, subItemIndex),
            {
              ...commentsData.comments[itemIndex].replies[subItemIndex],
              [name]: value,
            },
            ...commentsData.comments[itemIndex].replies.slice(subItemIndex + 1),
          ],
        },
        ...commentsData.comments.slice(itemIndex + 1),
      ];
      setCommentsData({
        currentUser: commentsData.currentUser,
        comments: updatedItems,
      });
    } else {
      commentsData.comments[commentIndex] = {
        ...commentsData.comments[commentIndex],
        [name]: value,
      };
      setCommentsData(commentsData);
    }
  };

  const editOnClick = (index) => {
    setEdit(true);
    setEditIndex(index);
  };

  const editOnSubmit = (e, id) => {
    e.preventDefault();
    updateComment(id, commentsData)
      .then((data) => {
        setEdit(false);
        setReplayBtn(false);
        setCommentsData(null);
        fetchComments();
      })
      .catch((err) => console.log(err));
  };

  const handleReplay = (index) => {
    setReplayBtn(true);
    setReplayIndex(index);
    setCommentBox((perState) => ({
      ...perState,
      mainIndex: index.index,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let requestBody = commentsData.comments.find((arr) => arr.user_content);
    createComment({ ...requestBody, currentUser: commentsData.currentUser })
      .then((data) => {
        setEdit(false);
        setCommentsData(null);
        setCommentBox(null);
        setReplayBtn(false);
        fetchComments();
      })
      .catch((err) => console.log(err));
  };

  const handleConformDelete = () => {
    onDeleteReplay(deleteComment.comment_id, deleteComment.id);
    setOpenModal(false);
  };

  const handleDelete = (comment_id, id) => {
    setOpenModal(true);
    setDeleteComment({ comment_id, id });
  };

  return (
    <>
      {commentsData &&
        commentsData.comments.map((item, i) => {
          let lastIndex = commentsData.comments.length - 1;
          return (
            <>
              <GridContainer>
                <CommentsSection
                  props={item}
                  onSubmitScore={onSubmitScore}
                  handleReplay={handleReplay}
                  index={i}
                  replayBtn={replayBtn}
                  replayIndex={replayIndex}
                />
              </GridContainer>

              {item.replies.length > 0 && (
                <ReplayContainer>
                  <section style={{ border: "2px solid hsl(223, 19%, 93%)" }} />
                  <section
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      width: "100%",
                    }}
                  >
                    {item.replies.map((arr, index) => (
                      <GridContainer key={i}>
                        {arr?.user?.username ===
                        commentsData.currentUser.username ? (
                          <CommentsReplay
                            submitReplayScore={submitReplayScore}
                            props={arr}
                            comment_id={item.id}
                            onClick={editOnClick}
                            edit={edit}
                            handleChange={handleChange}
                            editOnSubmit={editOnSubmit}
                            index={index}
                            commentIndex={i}
                            onDeleteReplay={onDeleteReplay}
                            editIndex={editIndex}
                            handleDelete={handleDelete}
                          />
                        ) : (
                          <CommentsSection
                            props={arr}
                            submitReplayScore={submitReplayScore}
                            comment_id={item.id}
                            handleReplay={handleReplay}
                          />
                        )}
                      </GridContainer>
                    ))}
                  </section>
                </ReplayContainer>
              )}

              {commentBox?.mainIndex === i && lastIndex !== i && (
                <GridContainer>
                  <CreateComment
                    commentIndex={i}
                    props={commentsData}
                    handleChange={handleChange}
                    value={item.user_content}
                    btnName="REPLAY"
                    onClick={onSubmit}
                  />
                </GridContainer>
              )}
              {lastIndex === i && (
                <GridContainer>
                  <CreateComment
                    props={commentsData}
                    handleChange={handleChange}
                    commentIndex={i}
                    value={item.user_content}
                    onClick={onSubmit}
                  />
                </GridContainer>
              )}
            </>
          );
        })}
      {openModal && (
        <article className={styles.card}>
          <section>
            <h2>Delete comment</h2>
            <p>
              Are you sure want to delete this comment? This will remove that
              comment and can&#39;t be undone.
            </p>
            <section style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setOpenModal(false)}
                style={{ backgroundColor: "hsl(212, 24%, 26%)" }}
              >
                NO, CANCEL
              </button>
              <button
                onClick={() => handleConformDelete()}
                style={{ backgroundColor: "hsl(358, 79%, 66%)" }}
              >
                YES, DELETE
              </button>
            </section>
          </section>
        </article>
      )}
    </>
  );
};
