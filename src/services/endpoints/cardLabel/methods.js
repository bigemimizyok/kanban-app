import instance from "../../instance";


export const create = async (values) => {
  try {
    return await instance.post("card-label", values);
  } catch (e) {
    console.error(e);
  }
};


export const deleteItem = async ({ id }) => {
  try {
    return await instance.delete(`card-label/${id}`);
  } catch (e) {
    console.error(e);
  }
};
