import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post('inbound')
  async handleInboundMessage(@Body() data: any) {
    const newMessage = await this.chatService.createMessageFromInbound(data);
    return {
      message: 'Inbound message created successfully',
      data: newMessage,
    };
  }

  @Post('outbound')
  async handleOutboundMessage(@Body() data: any) {
    const newMessage = await this.chatService.createMessageFromOutbound(data);
    return {
      message: 'Outbound message created successfully',
      data: newMessage,
    };
  }
}
