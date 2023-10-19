import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Order, OrderStatus } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { OrdersRepository } from '../repositories/orders-repository'

interface ChangeOrderStatusUseCaseRequest {
  orderId: string
  delivererId: string
  newStatus: OrderStatus
}

type ChangeOrderStatusUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    order: Order
  }
>

@Injectable()
export class ChangeOrderStatusUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
    delivererId,
    newStatus,
  }: ChangeOrderStatusUseCaseRequest): Promise<ChangeOrderStatusUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      return left(new ResourceNotFoundError())
    }

    if (delivererId !== order.delivererId.toString()) {
      return left(new NotAllowedError())
    }

    order.status = newStatus

    await this.ordersRepository.save(order)

    return right({
      order,
    })
  }
}
