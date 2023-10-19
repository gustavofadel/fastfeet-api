import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { OrderAttachment } from './order-attachment'

export type OrderStatus = 'Posted' | 'PickedUp' | 'Delivered' | 'Returned'

export interface OrderProps {
  recipientId: UniqueEntityID
  delivererId?: UniqueEntityID | null
  status: OrderStatus
  attachment?: OrderAttachment | null
  postedAt: Date
  pickedUpAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
}

export class Order extends AggregateRoot<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get delivererId() {
    return this.props.delivererId
  }

  get status() {
    return this.props.status
  }

  set status(status: OrderStatus) {
    this.props.status = status

    if (status === 'PickedUp') {
      this.props.pickedUpAt = new Date()
    }
    if (status === 'Delivered') {
      this.props.deliveredAt = new Date()
    }
    if (status === 'Returned') {
      this.props.returnedAt = new Date()
    }
  }

  get attachment() {
    return this.props.attachment
  }

  get postedAt() {
    return this.props.postedAt
  }

  get pickedUpAt() {
    return this.props.pickedUpAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  static create(
    props: Optional<OrderProps, 'status' | 'postedAt'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        status: props.status ?? 'Posted',
        postedAt: props.postedAt ?? new Date(),
      },
      id,
    )

    return order
  }
}
