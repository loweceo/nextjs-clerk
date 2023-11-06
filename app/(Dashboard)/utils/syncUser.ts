"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import connectSupabase from "./supabase/connectSupabase";
import * as Atoms from "./recoilAtoms";
import { useSetRecoilState } from "recoil";

const useSyncUser = () => {
  const setUserState = useSetRecoilState(Atoms.userState);
  const supabase = connectSupabase();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      const upsertUser = async () => {
        // Set Recoil state
        setUserState({
          id: user.id,
          name: user.username || "Unknown",
          email: user.emailAddresses[0].emailAddress,
        });

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
            },
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
  }, [isSignedIn, user, supabase, setUserState]);
};

export default useSyncUser;
