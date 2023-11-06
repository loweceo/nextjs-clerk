import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    id: "",
    name: "",
    email: "",
  },
});

export const contactsListState = atom({
  key: "contactsListState",
  default: [],
});
