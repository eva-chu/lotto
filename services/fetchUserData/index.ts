import axios from "axios";

export type User = {
  "name": {
    "title": string,
    "first": string,
    "last": string,
  },
  "picture": {
    "large": string,
    "medium": string,
    "thumbnail": string
  },
  "login": {
    "uuid": string,
    "username": string,
    "password": string,
    "salt": string,
    "md5": string,
    "sha1": string,
    "sha256": string
  }
};

const fetchUserData = async () => {
  const res = await axios(`https://randomuser.me/api/?results=100`);
  const data = res.data;
  return data;
};

export default fetchUserData;