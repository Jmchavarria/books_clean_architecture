import type { UsersDE } from 'src/app/users/domain/entity/users.domain-enity';

export abstract class AuthRepository {
  abstract validateUser(username: string, pass: string): Promise<UsersDE | null>;
  abstract verifyTokenOAuth(token: string): Promise<unknown>; //CAMBIAR EL UNKNOW POR MODELO DE RESPUESTA 
}
