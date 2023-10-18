import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeDeliverer } from 'test/factories/make-deliverer'
import { InMemoryDeliverersRepository } from 'test/repositories/in-memory-deliverers-repository'
import { AuthenticateDelivererUseCase } from './authenticate-deliverer'

let inMemoryDeliverersRepository: InMemoryDeliverersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateDelivererUseCase

describe('Authenticate Deliverer', () => {
  beforeEach(() => {
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateDelivererUseCase(
      inMemoryDeliverersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a deliverer', async () => {
    const deliverer = makeDeliverer({
      cpf: '00000000000',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryDeliverersRepository.items.push(deliverer)

    const result = await sut.execute({
      cpf: '00000000000',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
