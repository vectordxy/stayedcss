import { hz } from "./lib/main";

export default function Home() {
  const buttonstyle = {
    style: {
      backgroundColor: "black",
      color: "red",
      padding: "180px",
    },
  };

  return <div className={hz(buttonstyle)}>Hello This is a mainpage</div>;
}
