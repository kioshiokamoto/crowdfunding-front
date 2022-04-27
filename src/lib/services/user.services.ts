import { UserConfig } from "lib/types/user.types";
import api from "lib/utils/api";
import { getFirebaseToken } from "lib/utils/firebaseConfig";

export const createUser = async (user: UserConfig) => {
  const authorization = await getFirebaseToken();
  const response = await api.post("/auth/register", user, {
    headers: {
      "content-type": "application/json",
      Authorization: authorization
    }
  });

  return response.data;
};

export const getUserInfo = async (uid: string) => {
  const authorization = await getFirebaseToken();
  const response = await api.get("/auth/info", {
    headers: {
      "content-type": "application/json",
      Authorization: authorization
    },
    params: {
      uid
    }
  });

  return response.data;
};
