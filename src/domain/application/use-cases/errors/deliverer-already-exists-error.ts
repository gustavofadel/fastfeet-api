import { UseCaseError } from '@/core/errors/use-case-error'

export class DelivererAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Deliverer "${identifier}" already exists.`)
  }
}
