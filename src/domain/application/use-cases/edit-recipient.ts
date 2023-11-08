import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { Recipient } from '@/domain/enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface EditRecipientUseCaseRequest {
  name: string
  cpf: string
  address: string
}

type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

@Injectable()
export class EditRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    cpf,
    address,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findByCPF(cpf)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.name = name
    recipient.address = address

    await this.recipientsRepository.save(recipient)

    return right({
      recipient,
    })
  }
}
