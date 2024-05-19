const AddPersonFormPart = () => {
  return (
    <div>
      <form action="submit">
        <h1>新規登録</h1>
        <InputName />
        <InputGender />
        <InputBirthDate />
        <InputNote />
        <InputPhoto />
        <AddPersonButton />
      </form>
    </div>
  );
};

const InputName = () => {
  return (
    <div>
      <input type="text" />
    </div>
  );
};
const InputGender = () => {
  return (
    <div>
      <input type="radio" />
    </div>
  );
};
const InputBirthDate = () => {
  return (
    <div>
      <input type="date" />
    </div>
  );
};
const InputNote = () => {
  return (
    <div>
      <textarea
        maxLength={200}
        rows={4}
        cols={50}
        placeholder="備考を入力してください（最大200文字）"
      />
    </div>
  );
};
const InputPhoto = () => {
  return (
    <div>
      <input type="file" />
    </div>
  );
};
const AddPersonButton = () => {
  return (
    <div>
      <button>上記の内容で登録</button>
    </div>
  );
};

export default AddPersonFormPart;