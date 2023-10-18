import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { DeliverersRepository } from '../repositories/deliverers-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateDelivererUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateDelivererUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateDelivererUseCase {
  constructor(
    private deliverersRepository: DeliverersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateDelivererUseCaseRequest): Promise<AuthenticateDelivererUseCaseResponse> {
    const deliverer = await this.deliverersRepository.findByCPF(cpf)

    if (!deliverer) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      deliverer.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: deliverer.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
