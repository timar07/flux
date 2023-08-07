import { CLIArgsParser } from './core/cliArgsParser';
import SourceReader from './core/sourceReader';
import DescribableError from './core/describableError';
import ErrorFormatter from './core/errorFormatter';
import { Lexer } from './lexer/lexer';

try {
    const cliArgs = new CLIArgsParser().parse();
    const reader = new SourceReader();

    console.log(cliArgs);

    new Lexer(reader.readFile(cliArgs.fileName))
        .getTokens()
        .forEach(token => console.log(token.toString()));
} catch (e) {
    console.log(new ErrorFormatter(e as DescribableError).toString());
}
