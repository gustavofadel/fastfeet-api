import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DelivererProps {
  name: string
  cpf: string
  password: string
}

export class Deliverer extends Entity<DelivererProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  static create(props: DelivererProps, id?: UniqueEntityID) {
    const deliverer = new Deliverer(props, id)

    return deliverer
  }
}
