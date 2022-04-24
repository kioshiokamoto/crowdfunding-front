import { UserConfig } from "lib/types/user.types";
import api from "lib/utils/api";
import { getFirebaseToken } from "lib/utils/firebaseConfig";

export const createUser = async (user: UserConfig) => {
  const authorization = await getFirebaseToken();
  const response = await api.post("/user", user, {
    headers: {
      "content-type": "application/json",
      Authorization: authorization
    }
  });

  return response.data;
};
