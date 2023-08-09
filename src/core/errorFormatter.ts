import DescribableError from './describableError';

export default class ErrorFormatter {
    constructor(
        private error: DescribableError
    ) {}

    public toString() {
        const pos = this.error.getDebugInfo().getPosition();
        return `${this.getErrorTypeString()}: ${this.error.getMessage()} [${pos.line}:${pos.col}]`;
    }

    private getErrorTypeString() {
        return `\x1b[31m${this.error.getType()}\x1b[0m`;
    }
}
