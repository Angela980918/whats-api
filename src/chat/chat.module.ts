import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schema/message.schema';
import { ConversationSchema } from './schema/conversation.schema';
import mongoose from 'mongoose';

// async function testConnectionAndWrite() {
//   try {
//     const connectionString =
//       process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsapp';
//     await mongoose.connect(connectionString);
//     console.log('Connected to MongoDB!');
//   } catch (error) {
//     console.error('Error:', error);
//     process.exit(1);
//   }
// }
//
// testConnectionAndWrite();

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'whatsapp',
      family: 4,
      socketTimeoutMS: 45000,
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    }),
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: 'Conversation', schema: ConversationSchema },
    ]),
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
