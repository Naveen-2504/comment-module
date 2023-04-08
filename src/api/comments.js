import makeRequest from "./index";

export const getComments = () => {
  return makeRequest({
    uri: "api/comments",
  });
};

export const updateLike = (body) => {
  return makeRequest({
    uri: "api/comments/like",
    method: "PUT",
    body: JSON.stringify(body)
  });
};

export const updateDislike = (body) => {
  return makeRequest({
    uri: "api/comments/dislike",
    method: "PUT",
    body: JSON.stringify(body)
  });
};

export const updateReplayLike = (body) => {
  return makeRequest({
    uri: "api/replies/like",
    method: "PUT",
    body: JSON.stringify(body)
  });
};

export const updateReplayDislike = (body) => {
  return makeRequest({
    uri: "api/replies/dislike",
    method: "PUT",
    body: JSON.stringify(body)
  });
};

export const createComment = (body) => {
  return makeRequest({
    uri: `api/comments`,
    method: "POST",
    body: JSON.stringify(body)
  });
};

export const updateComment = (id, body) => {
  return makeRequest({
    uri: `api/comments/${id}`,
    method: "PUT",
    body: JSON.stringify(body)
  });
};


export const deleteReplayDislike = (id, body) => {
  return makeRequest({
    uri: `api/comments/${id}`,
    method: "DELETE",
    body: JSON.stringify(body)
  });
};

