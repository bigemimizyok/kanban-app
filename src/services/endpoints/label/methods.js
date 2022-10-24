import instance from "../../instance";

export const list = async () => {
  try {
    return await instance.get("label");
  } catch (e) {
    console.error(e);
  }
};
