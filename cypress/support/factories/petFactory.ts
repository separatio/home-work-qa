import { faker } from '@faker-js/faker'

export default function createNewPet(): Pet {
  const statusValues: PetStatus[] = ['available', 'pending', 'sold']

  return {
    id: faker.datatype.number(),
    name: faker.name.firstName(),
    category: {
      id: faker.datatype.number(),
      name: faker.animal.type(),
    },
    photoUrls: [faker.image.imageUrl(), faker.image.imageUrl()],
    tags: [
      {
        id: faker.datatype.number(),
        name: faker.animal.type(),
      },
    ],
    status: faker.helpers.arrayElement(statusValues),
  }
}
