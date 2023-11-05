import { atom } from "recoil";

export const userIdState = atom({
  key: "userIdState",
  default: '',
});

export const userNameState = atom({
  key: "userNameState",
  default: '',
});

export const userEmailState = atom({
  key: "userEmailState",
  default: '',
});