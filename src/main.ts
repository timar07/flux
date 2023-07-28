import { Lexer } from "./lexer/lexer";
import { TokenTag } from "./lexer/token";

new Lexer('2+2', '').getTokens().forEach(token => {
    console.log(TokenTag[token.getTag()]);
})
