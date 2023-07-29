import DebugInfo from "./debugInfo";

export default interface DescribableError {
    getType(): string;
    getMessage(): string;
    getDebugInfo(): DebugInfo;
}
