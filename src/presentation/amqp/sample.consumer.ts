import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { Channel, ConsumeMessage } from 'amqplib';

@Injectable()
export class SampleConsumer {
  @RabbitSubscribe({
    queue: 'subscribe-queue-2',
    errorHandler: (channel: Channel, msg: ConsumeMessage, error: any) => {
      Logger.log(msg, 'SampleConsumer');
      Logger.log(error, 'SampleConsumer');
      channel.ack(msg);
    },
  })
  public async pubSubHandler(msg: any) {
    Logger.log(
      `Received pub/sub message: ${JSON.stringify(msg)}`,
      'SampleConsumer',
    );
  }
}
