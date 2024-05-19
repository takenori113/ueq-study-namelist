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

// import { Person } from "@/component/person";

// const people: Person[] = [
//   {
//     name: "Kenneth",
//     gender: "男",
//     birthDate: "1992年1月13日",
//     note: "力持ち",
//     photoName: "example.png",
//   },
// new Person("Kenneth", "男", "1992年1月13日", "力持ち", "example.png"),
// new Person("Ellie", "女", "1994年1月13日", "ゴシップ好き", "example.png"),
// ];

// console.log(people);

const LoginUserPart = () => {
  return (
    <div>
      <p>ログインユーザー</p>
      <SignOutButton />
    </div>
  );
};

export default function Home() {
  const [people, setPeople] = React.useState<Person[]>([]);

  React.useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const q = query(
        collection(firestore, "people")
        // where("uid", "==", "lxHeXZmupnhcNU6bKU10uAoXl7U2")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((x) => x.data() as Person);
      setPeople(data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(people);
  return (
    <main>
      <LoginUserPart />
      <div>
        <h1 className="text-5xl font-bold underline font-mono">人物名鑑</h1>
        <div>
          遠くの親戚などあまり会わない人を登録すると忘れないから便利だぞ
        </div>
      </div>
      <AddPersonFormPart />
      <NameListPart people={people} />
    </main>
  );
}
