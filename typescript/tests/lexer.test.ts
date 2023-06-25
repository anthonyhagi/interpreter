import { Tokeniser } from '~/lexer';
import { TokenType } from '~/token';

test('test getNextToken()', () => {
  const input = `=+(){},;`;

  const tokens = [
    TokenType.Assign,
    TokenType.Plus,
    TokenType.Lparen,
    TokenType.Rparen,
    TokenType.Lbrace,
    TokenType.Rbrace,
    TokenType.Comma,
    TokenType.Semicolon,
  ];

  const lexer = new Tokeniser(input);

  for (const token of tokens) {
    expect(lexer.getNextToken().type).toBe(token);
  }
});
