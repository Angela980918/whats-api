// chat/schemas/conversation.schema.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  wabaId: number;
  customerId: string;
  messageList: Schema.Types.ObjectId[];
}

export const ConversationSchema = new Schema<IConversation>({
  wabaId: { type: Number, required: true },
  customerId: { type: String, required: true },
  messageList: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    required: true,
  },
});

export const Conversation = mongoose.model<IConversation>(
  'Conversation',
  ConversationSchema,
);
