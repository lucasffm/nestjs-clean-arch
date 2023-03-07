export interface ISocketIOGateway {
  emitToRoom(room: string, event: string, data: any): boolean;
}
