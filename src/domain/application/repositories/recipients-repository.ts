import { Recipient } from '@/domain/enterprise/entities/recipient';

export abstract class RecipientsRepository {
  abstract create(recipient: Recipient): Promise<void>
  abstract findByCPF(cpf: string): Promise<Recipient | null>
  abstract save(recipient: Recipient): Promise<void>
}
