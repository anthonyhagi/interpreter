import { Tokeniser } from '~/lexer';
import { Token, TokenType } from '~/token';

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

test('test getNextToken() complete', () => {
  const input = `let five = 5;
    let ten = 10;

    let add = fn(x, y) {
      x + y;
    };

    let result = add(five, ten);

    !-/*5;
    5 < 10 > 5;
    
    if (5 < 10) {
      return true;
    } else {
      return false;
    }

    10 == 10;
    10 != 9;
    `;

  const tokens = [
    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Function, literal: 'fn' },
    { type: TokenType.Lparen, literal: '(' },
    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.Rparen, literal: ')' },
    { type: TokenType.Lbrace, literal: '{' },
    { type: TokenType.Ident, literal: 'x' },
    { type: TokenType.Plus, literal: '+' },
    { type: TokenType.Ident, literal: 'y' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.Rbrace, literal: '}' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Let, literal: 'let' },
    { type: TokenType.Ident, literal: 'result' },
    { type: TokenType.Assign, literal: '=' },
    { type: TokenType.Ident, literal: 'add' },
    { type: TokenType.Lparen, literal: '(' },
    { type: TokenType.Ident, literal: 'five' },
    { type: TokenType.Comma, literal: ',' },
    { type: TokenType.Ident, literal: 'ten' },
    { type: TokenType.Rparen, literal: ')' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.Bang, literal: '!' },
    { type: TokenType.Minus, literal: '-' },
    { type: TokenType.Slash, literal: '/' },
    { type: TokenType.Asterisk, literal: '*' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Lt, literal: '<' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Gt, literal: '>' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Semicolon, literal: ';' },

    { type: TokenType.If, literal: 'if' },
    { type: TokenType.Lparen, literal: '(' },
    { type: TokenType.Int, literal: '5' },
    { type: TokenType.Lt, literal: '<' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Rparen, literal: ')' },
    { type: TokenType.Lbrace, literal: '{' },
    { type: TokenType.Return, literal: 'return' },
    { type: TokenType.True, literal: 'true' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.Rbrace, literal: '}' },
    { type: TokenType.Else, literal: 'else' },
    { type: TokenType.Lbrace, literal: '{' },
    { type: TokenType.Return, literal: 'return' },
    { type: TokenType.False, literal: 'false' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.Rbrace, literal: '}' },

    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Eq, literal: '==' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.Semicolon, literal: ';' },
    { type: TokenType.Int, literal: '10' },
    { type: TokenType.NotEq, literal: '!=' },
    { type: TokenType.Int, literal: '9' },
  ] satisfies Token[];

  const lexer = new Tokeniser(input);

  for (const token of tokens) {
    expect(lexer.getNextToken()).toStrictEqual(token);
  }
});
