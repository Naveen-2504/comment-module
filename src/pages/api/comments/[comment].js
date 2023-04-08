import comments from "../../../data/comment.json";
import fs from "fs";

export default function handler(req, res) {
  const { method, query, body } = req;
  if (method === "DELETE") {
    if (body.id) {
      let data = comments.comments.map((arr) => {
        if (arr.id == query.comment) {
          let r = arr.replies.findIndex((items) => body.id === items.id);
          arr.replies.splice(r, 1);
          return arr;
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
  } else if(method === "PUT") {
    const updatedDataJson = JSON.stringify(body, null, 2);
    fs.writeFileSync("src/data/comment.json", updatedDataJson);
    res.status(200).json({ msg: "Updated" });
  }
}
