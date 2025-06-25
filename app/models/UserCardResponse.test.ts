import { UserCardResponseModel } from "./UserCardResponse"

test("can be created", () => {
  const instance = UserCardResponseModel.create({
    id: 0,
    linkId: 0,
    cardId: 0,
    response: ""
  })

  expect(instance).toBeTruthy()
})


