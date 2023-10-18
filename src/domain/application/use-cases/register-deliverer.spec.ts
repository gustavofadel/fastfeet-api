import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryDeliverersRepository } from 'test/repositories/in-memory-deliverers-repository'
import { RegisterDelivererUseCase } from './register-deliverer'

let inMemoryDeliverersRepository: InMemoryDeliverersRepository
let fakeHasher: FakeHasher
let sut: RegisterDelivererUseCase

describe('Register deliverer', () => {
  beforeEach(() => {
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterDelivererUseCase(inMemoryDeliverersRepository, fakeHasher)
  })

  it('should be able to register a new deliverer', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '00000000000',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      deliverer: inMemoryDeliverersRepository.items[0],
    })
  })

  it('should hash deliverer password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '00000000000',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryDeliverersRepository.items[0].password).toEqual(
      hashedPassword,
    )
  })
})
