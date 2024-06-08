export default interface IMessage {
    role: 'system' | 'assistant' | 'user';
    content: string;
}
