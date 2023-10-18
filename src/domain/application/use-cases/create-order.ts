import { Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  recipientId: string
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    recipientId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
    })

    await this.ordersRepository.create(order)

    return right({
      order,
    })
  }
}
