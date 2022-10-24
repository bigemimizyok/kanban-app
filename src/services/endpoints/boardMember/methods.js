import instance from "../../instance";

export const create = async (values) => {
  try {
    return await instance.post("board-member", values);
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async ({ id }) => {
  try {
    return await instance.delete(`board-member/${id}`);
  } catch (e) {
    console.error(e);
  }
};

export const list = async ({ boardId }) => {
  try {
    return await instance.get("board-member", { params: { boardId: boardId } });
  } catch (e) {
    console.error(e);
  }
};
