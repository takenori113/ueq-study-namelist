import PersonFormPart from "@/components/PersonFormPart";
import NameListItem from "@/components/NameListItem";
import SignOutButton from "@/components/SignOutButton";
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
  const [editPersonId, setEditPersonId] = React.useState("");
  const [people, setPeople] = React.useState<Person[]>([]);

  React.useEffect(() => {
    fetchPeople();
  }, []);

  const handleAdd = async (data: Person) => {
    await addDoc(collection(firestore, "people"), data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await createData(e);
    console.log("Data to add:", data); // デバッグ用ログ
    await handleAdd(data);
    fetchPeople();
  };

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

  const createData = async (e: React.FormEvent<HTMLFormElement>) => {
    let fileName = "";
    const target = e.target as unknown as Target;
    const file = target.photo?.files[0];
    if (file) {
      fileName = await uploadPhoto(file);
    }
    const data = {
      name: target.name.value,
      gender: target.gender?.value,
      birthDate: target.birth_date?.value,
      note: target.note?.value,
      photo: fileName,
    };
    console.log(data);

    return data;
  };

  const uploadPhoto = async (file: File) => {
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
      const data = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Person;
        return {
          id: doc.id,
          ...data,
          // photoName: url,
        };
      });
      const fixedData = await Promise.all(
        data.map(async (x) => {
          if (x.photo) {
            const filePath = `images/${x.photo}`;
            const fileRef = ref(storage, filePath);
            console.log(filePath);
            const url = await getDownloadURL(fileRef);
            return {
              ...x,
              photo: url,
            };
          } else {
            return {
              ...x,
              photo:
                "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0gd1AdwbKPHvU5RaaWQLxAkmrwofr7cMQydo07eOCJHB0N9tH1VaEo1lhuJDWaPzM_HKMzVyIqPpHhoov-D09v2TkcPy61BrOIaiENhdCIP4LTCkZSeI1EbQ9xBZ5jcg7sFVIJvTb2MwQ/s1600/no_image_tate.jpg",
            };
          }
        })
      );
      setPeople(fixedData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (personId: string) => {
    console.log(personId);
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
      <LoginUserPart />
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
      </div>
    </main>
  );
}
