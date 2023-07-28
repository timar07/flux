import { Token, TokenTag } from "./token";

export class Lexer {
    private current = 0;
    private start = 0;
    private line = 0;
    private col = 0;

    constructor(
        private src: string,
        private fileName: string
    ) {}

    public getTokens(): Token[] {
        let tokens: Token[] = [];

        while (this.current < this.src.length) {
            tokens.push(this.getToken());
        }

        return tokens;
    }

    private getToken() {
        this.start = this.current;

        switch (this.advance()) {
            case '+':
                return this.createToken(TokenTag.Plus);
            case '-':
                return this.createToken(TokenTag.Minus);
            default:
                return this.parseNumberOrIdentifier();
        }
    }

    private parseNumberOrIdentifier(): Token {
        const ch = this.prev();

        if (this.isNumber(ch))
            return this.parseNumber();

        if (this.isIdentifier(ch))
            return this.parseIdentifier();

        throw new LexicalError(`unknown character '${ch}'`);
    }

    private parseNumber() {
        this.start = this.current;

        while (this.isNumber(this.peek())) {
            this.advance();
        }

        return this.createToken(TokenTag.Number);
    }

    private parseIdentifier(): Token {
        throw new Error("Method not implemented");
    }

    private isIdentifier(char: string) {
        return new RegExp("[a-zA-Z]").test(char);
    }

    private isNumber(char: string) {
        return new RegExp("[0-9]").test(char);
    }

    private createToken(tag: TokenTag): Token {
        return new Token(tag, this.start, this.current);
    }

    private prev(): string {
        return this.src[this.current-1];
    }

    private advance() {
        return this.src[this.current++];
    }

    private peek(): string {
        return this.src[this.current];
    }
}

class LexicalError extends Error {
    constructor(message: string) {
        super('Lexical error: ' + message);
    }
}
