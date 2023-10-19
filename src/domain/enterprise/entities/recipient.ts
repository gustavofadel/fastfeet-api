import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface RecipientProps {
  name: string
  cpf: string
  address: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get address() {
    return this.props.address
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id)

    return recipient
  }
}
