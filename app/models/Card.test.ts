import { CardModel } from "./Card"

test("can be created", () => {
  const instance = CardModel.create({})

  expect(instance).toBeTruthy()
})


