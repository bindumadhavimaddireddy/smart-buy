import axios from "axios";

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, parent, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, {name: sub, parent}, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, parent,  authtoken) => {
  console.log('sub', sub);
  return await axios.post(`${process.env.REACT_APP_API}/sub`, {name: sub, parent}, {
    headers: {
      authtoken,
    },
  });
}

