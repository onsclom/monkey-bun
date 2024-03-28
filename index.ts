// TODO: make this more strict
// for ex, assign will always have value of "="
const singleCharTokens = {
  "=": "ASSIGN",
  "+": "PLUS",
  ",": "COMMA",
  ";": "SEMICOLON",
  "(": "LPAREN",
  ")": "RPAREN",
  "{": "LBRACE",
  "}": "RBRACE",
};

const multiCharTokens = {
  fn: "FUNCTION",
  let: "LET",
};

const whitespace = [" ", "\t", "\r", "\n"];

type SingleCharTable = typeof singleCharTokens;
type MultiCharTable = typeof multiCharTokens;
type Token = {
  type: SingleCharTable[keyof SingleCharTable] | MultiCharTable[keyof MultiCharTable];
  value: string;
};

export function tokenize(progam: string) {
  let index = 0;
  let tokens: Token[] = [];

  while (index < progam.length) {
    while (whitespace.includes(progam[index])) index++;
    const cur = progam[index];

    if (cur in singleCharTokens) {
      tokens.push({ type: singleCharTokens[cur as keyof SingleCharTable], value: cur });
      index++;
      continue;
    }

    const startingKeyword = Object.keys(multiCharTokens).find((keyword) => progam.slice(index).startsWith(keyword));
    if (startingKeyword) {
      tokens.push({
        type: multiCharTokens[startingKeyword as keyof MultiCharTable].slice().toUpperCase() as Token["type"],
        value: startingKeyword,
      });
      index += startingKeyword.length;
      continue;
    }

    const intMatch = progam.slice(index).match(/^\d+/);
    if (intMatch) {
      tokens.push({ type: "INT", value: intMatch[0] });
      index += intMatch[0].length;
      continue;
    }

    const identifierMatch = progam.slice(index).match(/^[a-zA-Z]+/);
    if (identifierMatch) {
      tokens.push({ type: "IDENT", value: identifierMatch[0] });
      index += identifierMatch[0].length;
      continue;
    }

    tokens.push({ type: "ILLEGAL", value: cur });
    break;
  }

  // TODO: figure out how i want to handle EOF
  // if (index >= progam.length) {
  //   tokens.push({ type: "EOF", value: "" });
  // }

  return tokens;
}
