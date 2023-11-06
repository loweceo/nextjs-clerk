"use client";
import { useState, useEffect } from "react";
import connectSupabase from "../supabase/connectSupabase";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import * as Atoms from "../recoilAtoms";
import genId from "../genId";

function AddContact() {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const setContactsListState = useSetRecoilState(Atoms.contactsListState);
  const userState = useRecoilValue(Atoms.userState);
  const supabase = connectSupabase();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddContact = async () => {
    const id = genId(24);

    let { data, error } = await supabase.from("contacts").insert([
      {
        user_id: userState.id,
        contact_id: id,
        contact_name: contactName,
        contact_email: contactEmail,
      },
    ]);

    if (!contactName || !contactEmail) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setSuccessMessage("");
    } else {
      setSuccessMessage("Contact ajouté avec succès !");
      setErrorMessage("");
    }
    if (data) {
      setContactsListState(data);
    }

    if (error) {
      console.error("Error adding contact:", error);
    } else {
      console.log("Added contact:", data);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  return (
    <div className="flex max-w-xs flex-col gap-y-2">
      <input
        className="bg-gray-800"
        type="text"
        placeholder="Contact Name"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
      />
      <input
        className="bg-gray-800"
        type="email"
        placeholder="Contact Email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
      />
      <button onClick={handleAddContact}>Add Contact</button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && <div className="text-green-500">{successMessage}</div>}
    </div>
  );
}

export default AddContact;
