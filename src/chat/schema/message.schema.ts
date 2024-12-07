// chat/schemas/message.schema.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  from: string; // 发信人
  to: string; // 收信人
  type: string; // 消息类型
  content: string; // 消息内容
  direction: 'inbound' | 'outbound'; // 入站消息|出站消息
}

export const MessageSchema = new Schema<IMessage>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: String, required: true },
  direction: { type: String, required: true },
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
