import comments from "../../../data/comment.json";
import fs from "fs";

export default function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      res.status(200).json(comments);
      break;
    case "POST":
      let commentsLen = comments.comments.length;
      let replayLen = 0;
      comments.comments.map((arr) => (replayLen += arr.replies.length));
      let totalLen = commentsLen + replayLen;
      let data = comments.comments.map((arr) => {
        if (arr.id === body.id) {
          return {
            ...arr,
            replies: [
              ...arr.replies,
              {
                id: totalLen + 1,
                createdAt: new Date(),
                score: 0,
                replyingTo: arr.user.username,
                user: body.currentUser,
                content: body.user_content,
              },
            ],
          };
        } else {
          return arr;
        }
      });
      let resData = { ...comments, comments: data };
      const updatedDataJson = JSON.stringify(resData, null, 2);
      fs.writeFileSync("src/data/comment.json", updatedDataJson);
      res.status(200).json({ msg: "Created" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
