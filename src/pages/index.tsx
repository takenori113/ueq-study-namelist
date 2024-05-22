import React from "react";
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
import { ref, uploadBytes } from "firebase/storage";

import PersonFormPart from "@/components/PersonFormPart";
import NameListItem from "@/components/NameListItem";

import { Person, User } from "@/types";
import { firestore, storage, auth, signOut } from "@/firebase";

type Target = {
  name: {
    value: string;
  };
  gender?: {
    value: string;
  };
  birth_date?: {
    value: string;
  };
  note?: {
    value: string;
  };
  photo?: {
    files: File[];
  };
};

export default function Home() {
  const [editPersonId, setEditPersonId] = React.useState("");
  const [people, setPeople] = React.useState<Person[]>([]);
  const [user, setUser] = React.useState<User | null | undefined>();

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        location.href = "/login";
      } else {
        const appUser = user as User;
        setUser(appUser);
        fetchPeople();
      }
    });
  }, []);

  const handleAdd = async (data: Person) => {
    await addDoc(collection(firestore, "people"), data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createData(e);
    await handleAdd(data);
    fetchPeople();
  };

  const createData = async (e: React.FormEvent<HTMLFormElement>) => {
    const user = auth.currentUser;
    let fileName = "";
    const target = e.target as unknown as Target;
    const file = target.photo?.files[0];
    if (file) {
      const ext = file.name.split(".").pop();
      fileName = `${Date.now()}.${ext}`;
      const filePath = `images/${fileName}`;
      const fileRef = ref(storage, filePath);
      await uploadBytes(fileRef, file);
    }
    const data = {
      name: target.name.value,
      gender: target.gender?.value,
      birthDate: target.birth_date?.value,
      note: target.note?.value,
      photo: fileName,
      uid: user?.uid,
    };
    return data;
  };

  const fetchPeople = async () => {
    const user = auth.currentUser;
    try {
      const q = query(
        collection(firestore, "people"),
        where("uid", "==", user?.uid)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Person;
        return {
          id: doc.id,
          ...data,
        };
      });
      setPeople(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (personId: string) => {
    await deleteDoc(doc(firestore, "people", personId));
    await fetchPeople();
  };

  const handleUpdate =
    (personId: string) => async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = await createData(e);
      await updateDoc(doc(firestore, "people", personId), data);
      await fetchPeople();
      setEditPersonId("");
    };

  return (
    <main className="">
      <div>
        <p>ログインユーザー{user?.email}</p>
        <button onClick={() => signOut(auth)}>サインアウト</button>
      </div>
      <div>
        <h1 className="text-5xl font-bold underline font-mono">人物名鑑</h1>
        <div>
          遠くの親戚などあまり会わない人を登録すると忘れないから便利だぞ
        </div>
      </div>
      <PersonFormPart onSubmit={handleSubmit} />
      <div>
        <h2>人物名鑑</h2>
        <div>
          <ul>
            {people.map((x) => (
              <NameListItem
                key={x.id}
                person={x}
                onClickDelete={() => handleDelete(x.id ?? "")}
                onClickEdit={() => setEditPersonId(x.id ?? "")}
                isEditing={x.id === editPersonId}
                onClickUpdate={handleUpdate(x.id ?? "")}
              />
            ))}
          </ul>
        </div>
        <div>
          <a href={"/login"}>ログイン画面へ</a>
        </div>
      </div>
    </main>
  );
}
