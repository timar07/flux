import { Token } from '../../lexer/token';

export abstract class Node {}

export class BinaryNode implements Node {
    constructor(
        readonly left: Node,
        readonly right: Node,
        readonly op: Token
    ) {}
}

export class UnaryNode implements Node {
    constructor(
        readonly left: Node,
        readonly op: Token
    ) {}
}

export abstract class PrimaryNode {}
