import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { ChangeOrderStatusUseCase } from './change-order-status'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: ChangeOrderStatusUseCase

describe('Change Order Status', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new ChangeOrderStatusUseCase(inMemoryOrdersRepository)
  })

  it('should be able to change order status', async () => {
    const order = makeOrder({
      delivererId: new UniqueEntityID('deliverer-1'),
    })

    await inMemoryOrdersRepository.create(order)

    await sut.execute({
      orderId: order.id.toString(),
      delivererId: 'deliverer-1',
      newStatus: 'PickedUp',
    })

    expect(inMemoryOrdersRepository.items[0].status).toEqual('PickedUp')
    expect(inMemoryOrdersRepository.items[0].pickedUpAt).toBeInstanceOf(Date)
  })

  it('should not be able to change order status from another deliverer', async () => {
    const order = makeOrder({
      delivererId: new UniqueEntityID('deliverer-1'),
    })

    await inMemoryOrdersRepository.create(order)

    const result = await sut.execute({
      orderId: order.id.toString(),
      delivererId: 'deliverer-2',
      newStatus: 'PickedUp',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
