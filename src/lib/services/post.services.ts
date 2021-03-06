import api from "lib/utils/api";
import { getFirebaseToken } from "lib/utils/firebaseConfig";

export const getPost = async (params: any) => {
  const { user, last, id } = params ?? {};
  const authorization = await getFirebaseToken();

  const response = await api.get("/post", {
    headers: {
      "content-type": "application/json",
      Authorization: authorization
    },
    params: {
      last,
      user,
      id
    }
  });

  return response.data;
};

export const createPost = async (data: any) => {
  const authorization = await getFirebaseToken();
  const response = await api.post("/post/create", data, {
    headers: {
      "content-type": "application/json",
      Authorization: authorization
    }
  });

  return response.data;
};
