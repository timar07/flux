import DescribableError from "./core/describableError";
import ErrorFormatter from "./core/errorFormatter";
import { Lexer } from "./lexer/lexer";
import { TokenTag } from "./lexer/token";

try {
    new Lexer('(){}.,;^=><+-*/!').getTokens().forEach(token => {
        console.log(TokenTag[token.getTag()] + ' ' + token.getPosition());
    })
} catch (e) {
    console.log(new ErrorFormatter(e as DescribableError).toString());
}
