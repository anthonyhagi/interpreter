import { createInterface } from 'readline/promises';
import { Tokeniser } from './lexer';
import { TokenType } from './token';

const promptCursor = '>> ';

export async function Start(
  input: NodeJS.ReadStream,
  output: NodeJS.WriteStream
) {
  const prompt = createInterface({ input, output });

  let run = true;

  while (run) {
    const str = await prompt.question(promptCursor);

    if (str === 'exit' || str === 'exit()') {
      run = false;

      break;
    }

    const lexer = new Tokeniser(str);

    for (
      let token = lexer.getNextToken();
      token.type !== TokenType.Eof;
      token = lexer.getNextToken()
    ) {
      console.log(token);
    }
  }
}
