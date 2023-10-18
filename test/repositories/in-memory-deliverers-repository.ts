import { DeliverersRepository } from '@/domain/application/repositories/deliverers-repository'
import { Deliverer } from '@/domain/enterprise/entities/deliverer'

export class InMemoryDeliverersRepository implements DeliverersRepository {
  public items: Deliverer[] = []

  async create(deliverer: Deliverer): Promise<void> {
    this.items.push(deliverer)
  }

  async findByCPF(cpf: string): Promise<Deliverer> {
    const deliverer = this.items.find((item) => item.cpf === cpf)

    if (!deliverer) {
      return null
    }

    return deliverer
  }
}
