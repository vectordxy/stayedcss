import { hz } from "./hz";
import { StyleType } from "./types";

function* myGenerator() {
  yield "Hello";
  yield "World";
}
const gen = myGenerator();

console.log(gen.next()); // { value: "Hello", done: false }
console.log(gen.next());
