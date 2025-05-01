export interface AIMessage {
  text: string;
  type: 'user' | 'ai';
  timestamp: Date;
}