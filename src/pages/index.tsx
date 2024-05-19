import AddPersonFormPart from "@/component/AddPersonFormPart";
import NameListPart from "@/component/NameListPart";
import SignOutButton from "@/component/SignOutButton";
import { Person } from "@/types";
import React from "react";
import { firestore, storage, auth, signOut } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const LoginUserPart = () => {
  return (
    <div>
      <p>ログインユーザー</p>
      <SignOutButton />
    </div>
  );
};

export default function Home() {
  const [userInputData, setUserInputData] = React.useState<Person>();
  const [people, setPeople] = React.useState<Person[]>([]);
  React.useEffect(() => {
    fetchPeople();
  }, []);

  const handleAdd = async (data: Person) => {
    await addDoc(collection(firestore, "people"), data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log("Form submitted");
    const data = await createData(e);
    console.log("Data to add:", data); // デバッグ用ログ
    await handleAdd(data);
    fetchPeople();
  };

  const createData = async (e: any) => {
    let fileName = null;
    const file = e.target.photo.files[0];
    if (file) {
      fileName = await uploadPhoto(file);
    }
    const data = {
      name: e.target.name.value,
      gender: e.target.gender.value,
      birth_date: e.target.birth_date.value,
      note: e.target.note.value,
      photo: fileName,
    };
    return data;
  };
  const uploadPhoto = async (file: any) => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = `images/${fileName}`;
    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, file);
    return fileName;
  };

  const fetchPeople = async () => {
    try {
      const q = query(
        collection(firestore, "people")
        // where("uid", "==", "lxHeXZmupnhcNU6bKU10uAoXl7U2")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Person),
      }));
      setPeople(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main>
      <LoginUserPart />
      <div>
        <h1 className="text-5xl font-bold underline font-mono">人物名鑑</h1>
        <div>
          遠くの親戚などあまり会わない人を登録すると忘れないから便利だぞ
        </div>
      </div>
      <AddPersonFormPart onClickAdd={handleSubmit} />
      <NameListPart people={people} />
    </main>
  );
}
