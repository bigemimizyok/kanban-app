import instance from "../../instance";

export const list = async () => {
  try {
    return await instance.get("board");
  } catch (e) {
    console.error(e);
  }
};

export const getItem = async ({ id }) => {
  try {
    return await instance.get(`board/${id}`);
  } catch (e) {
    console.error(e);
  }
};

export const create = async ({ title }) => {
  try {
    return await instance.post("board", { title });
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async ({ id }) => {
  try {
    return await instance.delete(`board/${id}`);
  } catch (e) {
    console.error(e);
  }
};

export const update = async ({ id, value }) => {
  try {
    return await instance.put(`board/${id}`, value);
  } catch (e) {
    console.error(e);
  }
};
