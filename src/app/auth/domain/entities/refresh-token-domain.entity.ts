export class RefreshTokenDE {
  constructor(
    public id: string,
    public userId: number,
    public token: string,
    public expiresAt: Date,
    public createdAt: Date,
  ) {}
}
