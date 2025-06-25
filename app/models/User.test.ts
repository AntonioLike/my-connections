import { UserModel } from "./User"

test("can be created", () => {
  const instance = UserModel.create({
    id: 0,
    name: "",
    email: "",
    password: "",
    userToken: ""
  })

  expect(instance).toBeTruthy()
})


