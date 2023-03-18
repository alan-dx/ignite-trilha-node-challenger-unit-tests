import { User } from './../../entities/User';
import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';
import { ShowUserProfileError } from './ShowUserProfileError';

let showUserProfileUseCase: ShowUserProfileUseCase
let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: InMemoryUsersRepository

describe("AuthenticateUserUseCase", () => {

  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  test("should not be to show data of an user that not exists", async () => {
    const promise = showUserProfileUseCase.execute('1234567')

    expect(promise).rejects.toBeInstanceOf(ShowUserProfileError)
  })

  test("should show user profile data", async () => {

    const user = await createUserUseCase.execute({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "12345678"
    })

    const userProfileData = await showUserProfileUseCase.execute(user.id!)

    expect(userProfileData).toBeInstanceOf(User)
    expect(userProfileData.id).toBe(user.id)
  })

})
