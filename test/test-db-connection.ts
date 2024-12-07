import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// 创建模型
const TestModel = mongoose.model('Test', testSchema);

async function testConnectionAndWrite() {
  try {
    const connectionString =
      process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsapp';
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB!');

    // 写入一条数据
    const newDocument = new TestModel({
      name: 'John Doe',
      age: 33,
    });

    // 保存数据
    await newDocument.save();
    console.log('Data written to MongoDB:', newDocument);

    await mongoose.disconnect(); // 断开连接
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testConnectionAndWrite();
