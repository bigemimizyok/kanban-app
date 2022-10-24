import instance from "../../instance";


export const create = async (values) => {
  try {
    return await instance.post("comment", values);
  } catch (e) {
    console.error(e);
  }
};


export const deleteItem = async ({ id }) => {
  try {
    return await instance.delete(`comment/${id}`);
  } catch (e) {
    console.error(e);
  }
};
