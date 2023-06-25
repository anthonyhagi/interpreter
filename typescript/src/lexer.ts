import { Token, TokenType, lookupIdentifier } from '~/token';

const a = 'a'.charCodeAt(0);
const z = 'z'.charCodeAt(0);

const A = 'A'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);

const _ = '_'.charCodeAt(0);

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
    this.skipWhitespace();

    let token: Token | undefined;
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
    }

    if (this.isLetter(currentChar)) {
      const literal = this.readIdentifier();
      const tokenType = lookupIdentifier(literal);

      return this.newToken(tokenType, literal);
    } else if (this.isDigit(currentChar)) {
      const literal = this.readNumber();

      return this.newToken(TokenType.Int, literal);
    } else if (!token) {
      token = this.newToken(TokenType.Illegal, currentChar);
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

  private readIdentifier(): string {
    const position = this.position;

    while (this.isLetter(this.char)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  private readNumber(): string {
    const position = this.position;

    while (this.isDigit(this.char)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
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

  /**
   * Check that the character is a valid ASCII character in the alphabet.
   *
   * @param ch The character to check.
   *
   * @throws when the `ch` parameter is not of length `1`.
   *
   * @returns `true` if it is a lowercase or uppercase letter or underscore.
   */
  private isLetter(ch: string): boolean {
    if (ch.length !== 1) {
      throw new Error(
        `isLetter() requires a string of length 1. String of length ${ch.length} provided.`
      );
    }

    const code = ch.charCodeAt(0);

    // Match the character against the ASCII codes of lowercase and uppercase
    // letters, as well as the `_` (underscore) character.
    return (code >= a && code <= z) || (code >= A && code <= Z) || code === _;
  }

  private isDigit(ch: string): boolean {
    const code = ch.charCodeAt(0);

    return code >= 48 && code <= 57;
  }

  private skipWhitespace(): void {
    while (
      this.char === ' ' ||
      this.char === '\t' ||
      this.char === '\n' ||
      this.char === '\r'
    ) {
      this.readChar();
    }
  }
}
