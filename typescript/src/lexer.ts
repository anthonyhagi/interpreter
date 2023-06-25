import { Token, TokenType } from '~/token';

export class Tokeniser {
  // @ts-ignore
  private position: number = 0;

  private readPosition: number = 0;

  private char!: string;

  constructor(private input: string) {
    this.readChar();
  }

  /**
   * Get the next token from the input string.
   *
   * @returns The parsed Token from the input string.
   */
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

  /**
   * Helper function to create a new token from the specified type and
   * associated character.
   *
   * @param tokenType The type of token to create.
   * @param ch The literal character found for this token type.
   *
   * @returns The newly created token.
   */
  private newToken(tokenType: Token['type'], ch: string): Token {
    return { type: tokenType, literal: ch };
  }

  /**
   * Read the next character from the input string so that it's ready
   * to be tokenised.
   */
  private readChar(): void {
    this.char = '\0';

    if (this.readPosition < this.input.length) {
      const char = this.input[this.readPosition];

      if (char !== undefined) this.char = char;
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }
}
