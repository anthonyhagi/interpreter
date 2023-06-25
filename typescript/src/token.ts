export const TokenType = {
  Illegal: 'ILLEGAL',
  Eof: 'EOF',

  // Identifiers and literals
  Ident: 'IDENT',
  Int: 'INT',

  // Operators
  Assign: '=',
  Plus: '+',

  // Delimeters
  Comma: ',',
  Semicolon: ';',

  Lparen: '(',
  Rparen: ')',
  Lbrace: '{',
  Rbrace: '}',

  // Keywords
  Function: 'FUNCTION',
  Let: 'LET',
} as const;

type TokenItem = (typeof TokenType)[keyof typeof TokenType];

export type Token = {
  type: TokenItem;
  literal: string;
};
