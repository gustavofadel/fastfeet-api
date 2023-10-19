import { Either, left, right } from '@/core/either'
import { Recipient } from '@/domain/enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'
import { RecipientsRepository } from '../repositories/recipients-repository'
import { RecipientAlreadyExistsError } from './errors/recipient-already-exists-error'

interface RegisterRecipientUseCaseRequest {
  name: string
  cpf: string
  address: string
}

type RegisterRecipientUseCaseResponse = Either<
  RecipientAlreadyExistsError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class RegisterRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    cpf,
    address,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipientWithSameCPF = await this.recipientsRepository.findByCPF(cpf)

    if (recipientWithSameCPF) {
      return left(new RecipientAlreadyExistsError(cpf))
    }

    const recipient = Recipient.create({
      name,
      cpf,
      address,
    })

    await this.recipientsRepository.create(recipient)

    return right({
      recipient,
    })
  }
}
