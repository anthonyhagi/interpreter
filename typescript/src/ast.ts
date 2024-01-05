type Statement = {};

type Program = {
  statements: Statement[];
};

class Node implements Program {
  statements: Statement[];

  TokenLiteral(): string {
    if (this.statements.length > 0) {
      return;
    } else {
    }
  }
}
