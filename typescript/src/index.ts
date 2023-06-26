import { Start } from './repl';

const main = async () => {
  console.log('Hello! This is the Monkey Programming Language!');
  console.log('Feel free to type in commands');

  await Start(process.stdin, process.stdout);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);

    process.exit(1);
  });
