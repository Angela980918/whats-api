// mongodb.module.ts
import { Module, Global, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Global() // 标记为全局模块，以便在其他模块中无需再次导入
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsApp',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
})
export class MongodbModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly mongooseConnection: mongoose.Connection) {}

  async onModuleInit() {
    try {
      await this.mongooseConnection.asPromise(); // 等待连接完成
      console.log('Connected to MongoDB!'); // 连接成功提示
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error); // 连接失败提示，包含错误信息
      //  考虑在此处添加更健壮的错误处理，例如抛出异常或退出程序
      process.exit(1); // 退出程序，避免后续操作失败
    }
  }

  onModuleDestroy() {
    this.mongooseConnection.close(); // 关闭连接
    console.log('Disconnected from MongoDB!');
  }
}