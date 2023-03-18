import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError';
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: InMemoryUsersRepository

describe("AuthenticateUserUseCase", () => {

  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  test("should be able to sign in with an exists user", async () => {

    await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    const responseAuth = await authenticateUserUseCase.execute({
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    expect(responseAuth).toHaveProperty("token")
  })

  test("should not be able to sign in with an non exists user", async () => {

    const promise = authenticateUserUseCase.execute({
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    expect(promise).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })

  test("should not be able to sign in with email or password incorrect", async () => {

    await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    const promise = authenticateUserUseCase.execute({
      email: "johnde@gmail.com",
      password: "123456"
    })

    expect(promise).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })
})
