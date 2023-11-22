export default interface AuthRepository {
  login(): Promise<User>;
  signup(): Promise<User>;
}
