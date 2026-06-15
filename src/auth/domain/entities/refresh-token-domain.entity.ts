export class RefreshTokenDE {
  constructor(
    public id: number,
    public userId: number,
    public token: string,
    public expiresAt: Date,
    public createdAt: Date,
  ) {}
}
