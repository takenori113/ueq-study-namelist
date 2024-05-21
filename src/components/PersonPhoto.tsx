import { Person } from "@/types";

type Props = {
  person: Person;
};

const PersonPhoto = ({ person }: Props) => {
  if (person.photo) {
    return <img src={person.photo} alt="" width={200} height={200} />;
  } else {
    <img
      src=""
      alt="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0gd1AdwbKPHvU5RaaWQLxAkmrwofr7cMQydo07eOCJHB0N9tH1VaEo1lhuJDWaPzM_HKMzVyIqPpHhoov-D09v2TkcPy61BrOIaiENhdCIP4LTCkZSeI1EbQ9xBZ5jcg7sFVIJvTb2MwQ/s1600/no_image_tate.jpg"
      width={200}
      height={200}
    />;
  }
};

export default PersonPhoto;