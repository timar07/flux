import fs from 'fs';

class SourceReader {
    public readFile(path: string) {
        return fs.readFileSync(path, 'utf-8');
    }
}

export default SourceReader;
