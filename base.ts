function* example() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = example();

console.log(generator.next().value); // 1;
console.log(generator.next().value); // 2;
console.log(generator.next().value); // 3;
