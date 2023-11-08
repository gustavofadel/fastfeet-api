import { makeRecipient } from 'test/factories/make-recipient'
import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { EditRecipientUseCase } from './edit-recipient'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: EditRecipientUseCase

describe('Edit Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new EditRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to edit a recipient', async () => {
    const newRecipient = makeRecipient({
      name: 'Old Name',
      cpf: 'cpf-01',
      address: 'Old Address',
    })

    await inMemoryRecipientsRepository.create(newRecipient)

    await sut.execute({
      name: 'New Name',
      cpf: 'cpf-01',
      address: 'New Address',
    })

    expect(inMemoryRecipientsRepository.items[0]).toMatchObject({
      name: 'New Name',
      address: 'New Address',
    })
  })
})
