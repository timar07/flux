import DebugInfo from './debugInfo';

interface DescribableError {
    getType(): string;
    getMessage(): string;
    getDebugInfo(): DebugInfo;
}

export default DescribableError;
