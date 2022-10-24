import instance from "../../instance";

export const list = async () => {
  try {
    return await instance.get("user");
  } catch (e) {
    console.error(e);
  }
};
