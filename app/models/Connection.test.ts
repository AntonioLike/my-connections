import { ConnectionModel } from "./Connection"

test("can be created", () => {
  const instance = ConnectionModel.create({})

  expect(instance).toBeTruthy()
})


