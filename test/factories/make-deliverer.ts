import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Deliverer,
  DelivererProps,
} from '@/domain/enterprise/entities/deliverer'
import { faker } from '@faker-js/faker'

export function makeDeliverer(
  override: Partial<DelivererProps> = {},
  id?: UniqueEntityID,
) {
  const deliverer = Deliverer.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return deliverer
}
