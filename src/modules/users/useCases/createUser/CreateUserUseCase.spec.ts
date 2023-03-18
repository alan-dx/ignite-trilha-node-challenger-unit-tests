import { User } from '../../entities/User';
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from './CreateUserError';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: InMemoryUsersRepository

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  test("should be able to create a new user", async () => {

    const response = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    expect(response).toBeInstanceOf(User)
    expect(response).toHaveProperty("id")
  })

  test("should be not be able to create an user with an email that already exists", async () => {

    await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    const promise = createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    expect(promise).rejects.toBeInstanceOf(CreateUserError)
  })
})
