export type CLIArgs = {
    fileName: string
};

export class CLIArgsParser {
    parse(): CLIArgs {
        return {
            fileName: this.parsePositional(2)
        };
    }

    private parsePositional(pos: number) {
        if (!process.argv[pos])
            throw new CLIArgumentParsingError();

        return process.argv[pos];
    }
}

export class CLIArgumentParsingError extends Error {
    constructor() {
        super('Expected command line argument');
    }
}
