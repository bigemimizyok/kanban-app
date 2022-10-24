import instance from "../../instance";

export const login = async ({username, password}) => {
  try {
    const {data} = await instance.post("/auth/login", {
        username,
        password
    })
    return data
  } catch (e) {
    console.error(e)
  }
};

export const register = async ({username, password, passwordConfirm}) => {
  try {
    const {data} = await instance.post("/auth/register", {
        username,
        password,
        passwordConfirm
    })
    return data
  } catch (e) {
    console.error(e)
  }
};
