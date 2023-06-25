import { Token, TokenType } from '~/token';

export class Tokeniser {
  // @ts-ignore
  private position: number = 0;
  private readPosition: number = 0;
  private char!: string;

  constructor(private input: string) {
    this.readChar();
  }

  public getNextToken(): Token {
    let token: Token;
    const currentChar = this.char;

    switch (currentChar) {
      case '=':
        token = this.newToken(TokenType.Assign, currentChar);
        break;
      case '+':
        token = this.newToken(TokenType.Plus, currentChar);
        break;
      case '(':
        token = this.newToken(TokenType.Lparen, currentChar);
        break;
      case ')':
        token = this.newToken(TokenType.Rparen, currentChar);
        break;
      case '{':
        token = this.newToken(TokenType.Lbrace, currentChar);
        break;
      case '}':
        token = this.newToken(TokenType.Rbrace, currentChar);
        break;
      case ',':
        token = this.newToken(TokenType.Comma, currentChar);
        break;
      case ';':
        token = this.newToken(TokenType.Semicolon, currentChar);
        break;
      default:
        token = this.newToken(TokenType.Illegal, '');
    }

    this.readChar();

    return token;
  }

  private newToken(tokenType: Token['type'], ch: string): Token {
    return { type: tokenType, literal: ch };
  }

  private readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.char = '';
    } else {
      const char = this.input[this.readPosition];

      if (char !== undefined) this.char = char;
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }
}
