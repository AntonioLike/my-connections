import { CardStoreModel } from "./CardStore"

test("can be created", () => {
  const instance = CardStoreModel.create({})

  expect(instance).toBeTruthy()
})


