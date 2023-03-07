import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Server, Socket } from 'socket.io';
import { ISocketIOGateway } from 'src/infra/socket-io/socket-io.interface';

@WebSocketGateway({
  transports: ['websocket'],
})
@Injectable()
export class SocketIOGateway
  implements ISocketIOGateway, OnGatewayDisconnect, OnGatewayConnection
{
  @WebSocketServer()
  server: Server;

  constructor(@Inject('RedisClient') private redisClient: RedisClientType) {
    if (!this.redisClient.isOpen) {
      this.redisClient.connect();
    }
  }

  handleDisconnect(client: any) {
    Logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(socket: Socket) {
    socket.on('joinRoom', async (document) => {
      const connectedSocket = { document, socketId: socket.id };
      socket.join(document);
      socket.emit('message', `Se juntou a sala ${document}`);
      Logger.log(`${socket.id} se juntou a sala ${document}`);
      await this.storeConnectedSocket(connectedSocket);
    });
  }

  emitToRoom(room: string, event: string, data: any): boolean {
    return this.server.to(room).emit(event, data);
  }

  private async storeConnectedSocket(connectedSocket: {
    document: string;
    socketId: string;
  }) {
    console.log(connectedSocket.socketId);
    await this.redisClient.set(
      connectedSocket.document,
      JSON.stringify(connectedSocket),
    );
  }

  async findConnectedSocketByDocument(document: string) {
    const client = await this.redisClient.get(document);
    if (!client) throw new Error('Client not found in redis');
    return JSON.parse(client);
  }
}
