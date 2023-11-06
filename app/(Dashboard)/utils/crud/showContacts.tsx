"use client";
import React, { useEffect, useState } from "react";
import connectSupabase from "../supabase/connectSupabase";
import { useRecoilValue } from "recoil";
import * as Atoms from "../recoilAtoms";

interface Contact {
  contact_id: number;
  contact_name: string;
  contact_email: string;
}

function ShowContacts() {
  const setContactsState = useRecoilValue(Atoms.contactsListState);
  const userState = useRecoilValue(Atoms.userState);
  const [contacts, setContacts] = useState<Contact[]>([]); // Use the interface here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = connectSupabase();

  useEffect(() => {
    async function fetchContacts() {
      if (!userState?.id) return;

      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .eq("user_id", userState.id);

      if (error) {
        console.error("Error getting contacts:", error);
      } else {
        console.log("Got contacts:", data);
        setContacts(data);
      }
      setLoading(false);
    }


    fetchContacts();
  }, [userState, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading contacts: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-semibold">Contacts</h1>
      <div className="flex flex-col gap-1">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact.contact_id}
              className="bg-white/5 rounded-lg px-3 py-1.5 hover:bg-white/10 text-gray-200"
            >
              <p>{contact.contact_name}</p>
              <p>{contact.contact_email}</p>
            </div>
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    </div>
  );
}

export default ShowContacts;
