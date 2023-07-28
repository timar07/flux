export class Token {
    constructor(
        private tag: TokenTag,
        private start: number,
        private end: number
    ) {}

    public getTag() {
        return this.tag;
    }
}

export enum TokenTag {
    Number,
    Plus,
    Minus,
    Star,
    Slash
};
