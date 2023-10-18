import { Either, left, right } from '@/core/either'
import { Deliverer } from '@/domain/enterprise/entities/deliverer'
import { Injectable } from '@nestjs/common'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverersRepository } from '../repositories/deliverers-repository'
import { DelivererAlreadyExistsError } from './errors/deliverer-already-exists-error'

interface RegisterDelivererUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type RegisterDelivererUseCaseResponse = Either<
  DelivererAlreadyExistsError,
  {
    deliverer: Deliverer
  }
>

@Injectable()
export class RegisterDelivererUseCase {
  constructor(
    private deliverersRepository: DeliverersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDelivererUseCaseRequest): Promise<RegisterDelivererUseCaseResponse> {
    const delivererWithSameCPF = await this.deliverersRepository.findByCPF(cpf)

    if (delivererWithSameCPF) {
      return left(new DelivererAlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliverer = Deliverer.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.deliverersRepository.create(deliverer)

    return right({
      deliverer,
    })
  }
}
