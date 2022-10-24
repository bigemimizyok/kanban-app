import instance from "../../instance";

export const create = async (values) => {
  try {
    return await instance.post("card", values);
  } catch (e) {
    console.error(e);
  }
};

export const deleteItem = async ({ id }) => {
  try {
    return await instance.delete(`card/${id}`);
  } catch (e) {
    console.error(e);
  }
};

export const update = async ({ id, values }) => {
  try {
    return await instance.put(`card/${id}`, values);
  } catch (e) {
    console.error(e);
  }
};

export const get = async ({ id }) => {
  try {
    return await instance.get(`card/${id}`);
  } catch (e) {
    console.error(e);
  }
};
