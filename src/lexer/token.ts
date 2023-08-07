export class Token {
    constructor(
        private tag: TokenTag,
        private start: number,
        private end: number
    ) {}

    public getTag() {
        return this.tag;
    }

    public getPosition() {
        return [this.start, this.end];
    }

    public toString() {
        return '<' + TokenTag[this.tag] + '[' + this.start + ':' + this.end + ']>';
    }
}

export enum TokenTag {
    Identifier,
    Number,
    Plus,
    Minus,
    Star,
    Slash,
    LeftParen,
    RightParen,
    LeftCurly,
    RightCurly,
    Period,
    Comma,
    Semicolon,
    Circ,
    PlusEqual,
    MinusEqual,
    StarEqual,
    SlashEqual,
    BangEqual,
    Bang,
    ArrowRight,
    LessEqual,
    Less,
    Equal,
    EqualEqual,
    GreaterEqual,
    Greater,
    String,
    Else,
    Function,
    False,
    Print,
    True,
    If,
    Return,
    Loop
}
