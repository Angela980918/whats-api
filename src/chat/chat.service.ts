import { Injectable } from '@nestjs/common';
import { Message } from './schema/message.schema';

@Injectable()
export class ChatService {
  async createMessageFromInbound(data: any) {
    const { from, to, type, sendTime } = data;
    const content = type === 'text' ? data.text.body : '';
    const direction = 'inbound';

    const newMessage = new Message({
      from,
      to,
      type,
      content,
      direction,
    });

    await newMessage.save();
    return newMessage;
  }

  async createMessageFromOutbound(data: any) {
    const { from, to, type, sendTime } = data;
    const content = type === 'text' ? data.text.body : '';
    const direction = 'outbound';

    const newMessage = new Message({
      from,
      to,
      type,
      content,
      sendTime: new Date(sendTime),
      direction,
    });

    await newMessage.save();
    return newMessage;
  }
}
