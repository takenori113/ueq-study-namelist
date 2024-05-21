import { Person } from "@/types";
// import EditPersonForm from "./EditPersonForm";
import PersonFormPart from "./PersonFormPart";
import PersonPhoto from "./PersonPhoto";

type Props = {
  person: Person;
  onClickDelete?: () => void;
  onClickUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  onClickEdit: () => void;
  isEditing: Boolean;
};

const NameListItem = ({
  person,
  onClickDelete,
  onClickUpdate,
  onClickEdit,
  isEditing,
}: Props) => {
  if (!isEditing) {
    return (
      <li id={person.id} className="border-2">
        <PersonPhoto person={person} />
        <div>名前： {person.name}</div>
        <div>性別： {person.gender}</div>
        <div>誕生日： {person.birthDate}</div>
        <div>備考： {person.note}</div>
        <div>
          <button onClick={onClickDelete}>削除</button>
        </div>
        <div>
          <button onClick={onClickEdit}>編集</button>
        </div>
      </li>
    );
  } else {
    return <PersonFormPart onSubmit={onClickUpdate} person={person} />;
  }
};

export default NameListItem;
