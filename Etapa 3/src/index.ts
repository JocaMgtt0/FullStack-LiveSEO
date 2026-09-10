interface User {
  id: number;
  name: string;
  age: number;
}

const users: User[] = [
  { id: 1, name: "Ana", age: 25 },
  { id: 2, name: "Pedro", age: 30 },
  { id: 3, name: "Maria", age: 22 },
];

// Versão simples: só resolve o caso pedido (nomes de quem tem mais de 23 anos).
function getNamesOlderThan23(users: User[]): string[] {
  return users.filter((user) => user.age > 23).map((user) => user.name);
}

// Bônus: extrai só as chaves de T cujo valor é number, para não deixar
// filtrar por campos como "name" (erro detectado em tempo de compilação).
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

function filterByNumericField<T, K extends NumericKeys<T>>(
  items: T[],
  field: K,
  min: number,
): T[] {
  return items.filter((item) => (item[field] as number) > min);
}

console.log("Nomes com mais de 23 anos:", getNamesOlderThan23(users));

console.log(
  "Genérico - filtrando por 'age' > 23:",
  filterByNumericField(users, "age", 23).map((user) => user.name),
);

console.log(
  "Genérico - filtrando por 'id' > 1:",
  filterByNumericField(users, "id", 1).map((user) => user.name),
);

// A linha abaixo não compila de propósito: "name" não é um campo numérico de User.
// filterByNumericField(users, "name", 23);
