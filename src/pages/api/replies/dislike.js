import comments from "../../../data/comment.json";
import fs from "fs";

export default function handler(req, res) {
  const { body } = req;
  if (body.id) {
    let data = comments.comments.map((arr) => {
      if (arr.id === body.comment_id) {
        let r = arr.replies.map((items) => {
          if (body.id === items.id) {
            return { ...items, score: items.score - 1 };
          } else {
            return items
          }
        });
        return { ...arr, replies: r };
      } else {
        return arr;
      }
    });
    let resData = { ...comments, comments: data };
    const updatedDataJson = JSON.stringify(resData, null, 2);
    fs.writeFileSync("src/data/comment.json", updatedDataJson);
    res.status(200).json({ msg: "Updated" });

  } else {
    res.status(422).json({ msg: "params is missing" });
  }
}
