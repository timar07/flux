import DescribableError from "../core/describableError";
import DebugInfo from "../core/debugInfo";
import { Token, TokenTag } from "./token";
import FilePosition from "../core/filePosition";

export class Lexer {
    private current = 0;
    private start = 0;
    private pos: FilePosition = {
        line: 0,
        col: 0
    };

    constructor(
        private src: string,
    ) {}

    public getTokens(): Token[] {
        const tokens: Token[] = [];

        while (!this.isAtEnd()) {
            tokens.push(this.getToken());
        }

        return tokens;
    }

    private getToken(): Token {
        this.start = this.current;

        switch (this.advance()) {
            case ' ': case '\t': case '\n': return this.getToken();
            case '(': return this.createToken(TokenTag.LeftParen);
            case ')': return this.createToken(TokenTag.RightParen);
            case '{': return this.createToken(TokenTag.LeftCurly);
            case '}': return this.createToken(TokenTag.RightCurly);
            case '.': return this.createToken(TokenTag.Period);
            case ',': return this.createToken(TokenTag.Comma);
            case ';': return this.createToken(TokenTag.Semicolon);
            case '^': return this.createToken(TokenTag.Circ);
            case '=': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.EqualEqual);
                }

                return this.createToken(TokenTag.Equal)
            }
            case '>': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.GreaterEqual);
                }

                return this.createToken(TokenTag.Greater);
            }
            case '<': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.LessEqual);
                }

                return this.createToken(TokenTag.Less);
            }
            case '+': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.PlusEqual);
                }

                return this.createToken(TokenTag.Plus);
            }
            case '-': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.MinusEqual);
                } else if (this.match('>')) {
                    return this.createToken(TokenTag.ArrowRight);
                }

                return this.createToken(TokenTag.Minus);
            }
            case '*': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.StarEqual);
                }

                return this.createToken(TokenTag.Star);
            }
            case '/': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.SlashEqual);
                }

                return this.createToken(TokenTag.Slash);
            }
            case '!': {
                if (this.match('=')) {
                    return this.createToken(TokenTag.BangEqual)
                }

                return this.createToken(TokenTag.Bang);
            }
            case '"':
                return this.parseString();
            default:
                return this.parseNumberOrKeyword();
        }
    }

    private parseString(): Token {
        while (this.advance() != '"') {
            if (this.isAtEnd()) {
                throw new LexicalError(
                    'unterminated string',
                    new DebugInfo(this.pos)
                );
            }
        }

        return this.createToken(TokenTag.String);
    }

    private parseNumberOrKeyword(): Token {
        const ch = this.prev();

        if (this.isNumber(ch))
            return this.parseNumber();
        else if (this.isIdentifierChar(ch))
            return this.parseKeyword();

        throw new LexicalError(
            `unknown character '${ch}'`,
            new DebugInfo(this.pos)
        );
    }

    private parseKeyword(): Token {
        switch (this.prev()) {
            case 'e': return this.acceptWord('lse', TokenTag.Else);
            case 'p': return this.acceptWord('rint', TokenTag.Print);
            case 't': return this.acceptWord('rue', TokenTag.True);
            case 'i': return this.acceptWord('f', TokenTag.If);
            case 'r': return this.acceptWord('eturn', TokenTag.Return);
            case 'l': return this.acceptWord('oop', TokenTag.Loop);
            case 'f': {
                switch (this.peek()) {
                    case 'u': return this.acceptWord('unction', TokenTag.Function);
                    case 'a': return this.acceptWord('alse', TokenTag.False);
                    default: return this.parseIdentifier();
                }
            }
            default:
                return this.parseIdentifier();
        }
    }

    private parseNumber() {
        while (!this.isAtEnd() && this.isNumber(this.peek())) {
            this.advance();
        }

        if (!this.isAtEnd() && this.peek() == '.') {
            this.advance();

            while (!this.isAtEnd() && this.isNumber(this.peek())) {
                this.advance();
            }
        }

        return this.createToken(TokenTag.Number);
    }

    private acceptWord(word: string, tag: TokenTag): Token {
        if (this.matchWord(word)) {
            return this.createToken(tag);
        }

        return this.parseIdentifier();
    }

    private parseIdentifier(): Token {
        while (!this.isAtEnd() && this.isIdentifierChar(this.peek())) {
            this.advance();
        }

        return this.createToken(TokenTag.Identifier);
    }

    private isIdentifierChar(char: string) {
        return new RegExp("[a-zA-Z_]").test(char);
    }

    private isNumber(char: string) {
        return new RegExp("[0-9]").test(char);
    }

    private createToken(tag: TokenTag): Token {
        return new Token(tag, this.start, this.current);
    }

    private matchWord(word: string) {
        if (this.checkWord(word)) {
            this.current += word.length;
            this.pos.col += word.length;
            return true;
        }

        return false;
    }

    private checkWord(word: string): boolean {
        return this.src.slice(this.current, this.current+word.length) == word;
    }

    private match(ch: string) {
        if (this.peek() == ch) {
            this.advance();
            return true;
        }

        return false;
    }

    private next(): string {
        return this.getCharAt(this.current+1);
    }

    private prev(): string {
        return this.getCharAt(this.current-1);
    }

    private advance() {
        const ch = this.getCharAt(this.current);

        if (ch == '\n') {
            this.pos.line++;
            this.pos.col = 0;
        } else {
            this.pos.col++;
        }

        return this.getCharAt(this.current++);
    }

    private peek(): string {
        return this.getCharAt(this.current);
    }

    private getCharAt(offset: number) {
        if (offset <= this.src.length)
            return this.src[offset]

        throw new LexicalError(
            'unexpected end of file',
            new DebugInfo(this.pos)
        );
    }

    private isAtEnd() {
        return this.current >= this.src.length;
    }
}

class LexicalError implements DescribableError {
    constructor(
        private message: string,
        private debugInfo: DebugInfo
    ) {}

    public getType() { return 'LexicalError'; }
    public getMessage() { return this.message; }
    public getDebugInfo() { return this.debugInfo; }
}
