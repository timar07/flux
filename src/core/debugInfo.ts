import FilePosition from './filePosition';

export default class DebugInfo {
    constructor(
        private position: FilePosition
    ) {}

    getPosition() { return this.position; }
}