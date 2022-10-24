import instance from "../../instance";

export const list = async ({ boardId }) => {
  try {
    return await instance.get("list", { params: { boardId: boardId } });
  } catch (e) {
    console.error(e);
  }
};

export const create = async ({ title, boardId }) => {
  try {
    return await instance.post("list", { title, boardId });
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async ({ id }) => {
  try {
    return await instance.delete(`list/${id}`);
  } catch (e) {
    console.error(e);
  }
};

export const update = async ({ id, value }) => {
  try {
    return await instance.put(`list/${id}`, value);
  } catch (e) {
    console.error(e);
  }
};
