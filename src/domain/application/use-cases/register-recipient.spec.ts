import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { RegisterRecipientUseCase } from './register-recipient'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: RegisterRecipientUseCase

describe('Register recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new RegisterRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to register a new recipient', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '00000000000',
      address: '123 Main Street, Apt 4B',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipient: inMemoryRecipientsRepository.items[0],
    })
  })
})
