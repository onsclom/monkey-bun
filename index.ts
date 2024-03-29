// TODO: make this more strict
// for ex, assign will always have value of "="
const singleCharTokens = {
  "=": "ASSIGN",
  "+": "PLUS",
  "-": "MINUS",
  "/": "SLASH",
  "*": "ASTERISK",
  "<": "LT",
  ">": "GT",
  ",": "COMMA",
  ";": "SEMICOLON",
  "(": "LPAREN",
  ")": "RPAREN",
  "{": "LBRACE",
  "}": "RBRACE",
  "!": "BANG",
} as const;

const multiCharTokens = {
  fn: "FUNCTION",
  let: "LET",
  if: "IF",
  return: "RETURN",
  true: "TRUE",
  false: "FALSE",
  else: "ELSE",
  "==": "EQ",
  "!=": "NOT_EQ",
} as const;

const whitespace = [" ", "\t", "\r", "\n"];

type SingleCharTable = typeof singleCharTokens;
type MultiCharTable = typeof multiCharTokens;
type Token = {
  type:
    | SingleCharTable[keyof SingleCharTable]
    | MultiCharTable[keyof MultiCharTable]
    | "IDENT"
    | "INT"
    | "ILLEGAL"
    | "EOF";
  value: string;
};

export function tokenize(progam: string) {
  let index = 0;
  let tokens: Token[] = [];

  while (index < progam.length) {
    while (whitespace.includes(progam[index])) index++;
    if (index >= progam.length) break;

    const cur = progam[index];

    const startingKeyword = Object.keys(multiCharTokens).find((keyword) =>
      progam.slice(index).startsWith(keyword),
    );
    if (startingKeyword) {
      tokens.push({
        type: multiCharTokens[startingKeyword as keyof MultiCharTable]
          .slice()
          .toUpperCase() as Token["type"],
        value: startingKeyword,
      });
      index += startingKeyword.length;
      continue;
    }

    if (cur in singleCharTokens) {
      tokens.push({
        type: singleCharTokens[cur as keyof SingleCharTable],
        value: cur,
      });
      index++;
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

  if (index >= progam.length) {
    tokens.push({ type: "EOF", value: "" });
  }

  return tokens;
}
