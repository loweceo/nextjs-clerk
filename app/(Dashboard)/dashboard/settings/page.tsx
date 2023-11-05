"use client";
import { useRecoilValue } from "recoil";
import { userNameState } from "../../utils/recoilAtoms";

export default function Settings() {
  const userName = useRecoilValue(userNameState);

  return (
    <div>
      <h1>Settings</h1>
      <p>{userName}</p>
    </div>
  );
}
