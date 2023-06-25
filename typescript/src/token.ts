export const TokenType = {
  Illegal: 'ILLEGAL',
  Eof: 'EOF',

  // Identifiers and literals
  Ident: 'IDENT',
  Int: 'INT',

  // Operators
  Assign: '=',
  Plus: '+',
  Minus: '-',
  Bang: '!',
  Asterisk: '*',
  Slash: '/',

  Lt: '<',
  Gt: '>',

  Eq: '==',
  NotEq: '!=',

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
  True: 'TRUE',
  False: 'FALSE',
  If: 'IF',
  Else: 'ELSE',
  Return: 'RETURN',
} as const;

type TokenItem = (typeof TokenType)[keyof typeof TokenType];

export type Token = {
  type: TokenItem;
  literal: string;
};

const keywords: Record<string, TokenItem> = {
  fn: 'FUNCTION',
  let: 'LET',
  true: 'TRUE',
  false: 'FALSE',
  if: 'IF',
  else: 'ELSE',
  return: 'RETURN',
};

export function lookupIdentifier(literal: string): Token['type'] {
  return keywords[literal] ?? TokenType.Ident;
}
