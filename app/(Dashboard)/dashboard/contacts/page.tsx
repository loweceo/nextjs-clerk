import AddContact from "../../utils/crud/addContact";
import ShowContacts from "../../utils/crud/showContacts";

export default function Contacts() {
  return (
    <main>
      <h1>Contacts</h1>
      <AddContact />
      <ShowContacts />
    </main>
  );
}
