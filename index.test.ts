import { expect, test } from "bun:test";
import { tokenize } from "./index";

test("can tokenize", () => {
  expect(tokenize(`=+(){},`)).toEqual([
    { type: "ASSIGN", value: "=" },
    { type: "PLUS", value: "+" },
    { type: "LPAREN", value: "(" },
    { type: "RPAREN", value: ")" },
    { type: "LBRACE", value: "{" },
    { type: "RBRACE", value: "}" },
    { type: "COMMA", value: "," },
  ]);

  expect(
    tokenize(`let five = 5;
  let ten = 10;
  let add = fn(x, y) {
    x + y;
  };
  let result = add(five, ten);`),
  ).toEqual([
    { type: "LET", value: "let" },
    { type: "IDENT", value: "five" },
    { type: "ASSIGN", value: "=" },
    { type: "INT", value: "5" },
    { type: "SEMICOLON", value: ";" },
    { type: "LET", value: "let" },
    { type: "IDENT", value: "ten" },
    { type: "ASSIGN", value: "=" },
    { type: "INT", value: "10" },
    { type: "SEMICOLON", value: ";" },
    { type: "LET", value: "let" },
    { type: "IDENT", value: "add" },
    { type: "ASSIGN", value: "=" },
    { type: "FUNCTION", value: "fn" },
    { type: "LPAREN", value: "(" },
    { type: "IDENT", value: "x" },
    { type: "COMMA", value: "," },
    { type: "IDENT", value: "y" },
    { type: "RPAREN", value: ")" },
    { type: "LBRACE", value: "{" },
    { type: "IDENT", value: "x" },
    { type: "PLUS", value: "+" },
    { type: "IDENT", value: "y" },
    { type: "SEMICOLON", value: ";" },
    { type: "RBRACE", value: "}" },
    { type: "SEMICOLON", value: ";" },
    { type: "LET", value: "let" },
    { type: "IDENT", value: "result" },
    { type: "ASSIGN", value: "=" },
    { type: "IDENT", value: "add" },
    { type: "LPAREN", value: "(" },
    { type: "IDENT", value: "five" },
    { type: "COMMA", value: "," },
    { type: "IDENT", value: "ten" },
    { type: "RPAREN", value: ")" },
    { type: "SEMICOLON", value: ";" },
  ]);
});
