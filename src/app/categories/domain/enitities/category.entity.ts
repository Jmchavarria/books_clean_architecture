export class CategoryDE {
  constructor(
    public readonly id: string,
    public name: string,
    public isActive: boolean,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }
}
