import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps,
} from '@/domain/enterprise/entities/recipient'
import { faker } from '@faker-js/faker'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      address: faker.location.streetAddress(true),
      ...override,
    },
    id,
  )

  return recipient
}
