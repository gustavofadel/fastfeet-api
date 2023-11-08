import { RecipientsRepository } from '@/domain/application/repositories/recipients-repository'
import { Recipient } from '@/domain/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }

  async findByCPF(cpf: string): Promise<Recipient> {
    const recipient = this.items.find((item) => item.cpf === cpf)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async save(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.cpf === recipient.cpf)

    this.items[itemIndex] = recipient
  }
}
