import { Person } from "@/types";

type Props = {
  person: Person;
  onClickDelete?: () => void;
};

const NameListItem = ({ person, onClickDelete }: Props) => {
  return (
    <li className="border">
      <img src={person.photoName} alt="" />
      <div>名前： {person.name}</div>
      <div>性別： {person.gender}</div>
      <div>誕生日： {person.birthDate}</div>
      <div>備考： {person.note}</div>
      <div>
        <button onClick={onClickDelete}>削除</button>
      </div>
      <div>
        <button>編集</button>
      </div>
    </li>
  );
};

export default NameListItem;
