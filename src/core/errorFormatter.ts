import DescribableError from './describableError';

export default class ErrorFormatter {
    constructor(
        private error: DescribableError
    ) {}

    public toString() {
        const pos = this.error.getDebugInfo().getPosition();
        return `${this.error.getType()}: ${this.error.getMessage()} [${pos.line}:${pos.col}]`;
    }
}
