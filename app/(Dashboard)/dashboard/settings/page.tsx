"use client";
import { useRecoilValue } from "recoil";
import * as Atoms from "../../utils/recoilAtoms";

export default function Settings() {
  const userState = useRecoilValue(Atoms.userState);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}
