export interface ICheckoutUseCase{
    checkout(id: string): Promise<void>
}