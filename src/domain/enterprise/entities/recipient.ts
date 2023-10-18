import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RecipientProps {
  name: string
  address: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  get address() {
    return this.props.address
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id)

    return recipient
  }
}
