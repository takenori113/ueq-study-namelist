import { Person } from "@/types";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  person?: Person;
};

const PersonFormPart = ({ onSubmit, person }: Props) => {
  return (
    <div>
      <form id="add-from" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">名前:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="お名前を入力してください"
            defaultValue={person?.name}
          />
        </div>
        <div>
          <label htmlFor="birthdate">生年月日:</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            defaultValue={person?.birthDate}
          />
        </div>
        <div>
          <label>性別:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            defaultChecked={person?.gender === "male"}
          />
          <label htmlFor="male">男性</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            defaultChecked={person?.gender === "female"}
          />
          <label htmlFor="female">女性</label>
          <input
            type="radio"
            id="other"
            name="gender"
            value="other"
            defaultChecked={person?.gender === "other"}
          />
          <label htmlFor="other">その他</label>
        </div>
        <div>
          <label htmlFor="note">備考:</label>
          <textarea
            id="note"
            name="note"
            rows={4}
            cols={50}
            maxLength={200}
            placeholder="備考を入力してください（最大200文字）"
            defaultValue={person?.note}
          ></textarea>
        </div>
        <div>
          <label htmlFor="photo">顔写真:</label>
          <input type="file" id="photo" name="photo" accept="image/*" />
        </div>
        <button type="submit" id="submit">
          送信
        </button>
      </form>
    </div>
  );
};

export default PersonFormPart;
