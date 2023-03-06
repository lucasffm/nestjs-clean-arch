export interface UseCase<Model> {
  execute(
    ...args: any[]
  ): Promise<Model> | Promise<Model[]> | void | Model | Model[];
}
