"use client";
// Assuming "use client" is a typo or an unknown directive, I'm omitting it.
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import connectSupabase from "./supabase/connectSupabase";
import * as Atoms from "./recoilAtoms";
import { useSetRecoilState } from "recoil"; // Corrected to useSetRecoilState instead of useResetRecoilState

const useSyncUser = () => {
  const setUserIdState = useSetRecoilState(Atoms.userIdState);
  const setUserNameState = useSetRecoilState(Atoms.userNameState);
  const setUserEmailState = useSetRecoilState(Atoms.userEmailState);
  const supabase = connectSupabase();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const upsertUser = async () => {
        // Set Recoil state
        setUserIdState(user.id);
        setUserNameState(user.username || "Unknown");
        setUserEmailState(user.emailAddresses[0].emailAddress);

        // Upsert user data to Supabase
        try {
          const { data, error } = await supabase.from("users").upsert(
            {
              user_id: user.id,
              user_email: user.emailAddresses[0].emailAddress,
              user_username: user.username,
              user_last_connection: new Date().toISOString(),
            },
            {
              onConflict: "user_id",
            }
          );

          if (error) {
            throw error;
          }
          console.log("User data synchronized with Supabase", data);
        } catch (error) {
          console.error("Error upserting user data in Supabase", error);
        }
      };

      upsertUser();
    }
  }, [isSignedIn, user, supabase, setUserIdState, setUserNameState, setUserEmailState]);

  // The hook should return something if it is expected to be used elsewhere
  // If no value is to be returned, then it can be left as is.
};

export default useSyncUser;
