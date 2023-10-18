import { Deliverer } from '@/domain/enterprise/entities/deliverer';

export abstract class DeliverersRepository {
  abstract create(deliverer: Deliverer): Promise<void>
  abstract findByCPF(cpf: string): Promise<Deliverer | null>
}
