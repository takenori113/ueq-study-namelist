import { Person } from "@/types";
import NameListItem from "./NameListItem";

type Props = {
  people: Person[];
};

const NameListPart = ({ people }: Props) => {
  return (
    <div>
      <h2>人物名鑑</h2>
      <div>
        <ul>
          {people.map((x) => (
            <NameListItem
              key={x.id}
              person={x}
              onClickDelete={() => console.log("delete")}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NameListPart;
