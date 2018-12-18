import { uniqueById } from './unique'

describe('uniqueById', () => {
  it('is unique', () => {
    const Categories = [
      {
        id: 0,
        name: '自然科学',
      },
      {
        id: 1,
        name: '医药',
      },
      {
        id: 2,
        name: '工程科技',
      },
      {
        id: 3,
        name: '人文社会',
      },
    ]

    expect(
      uniqueById([
        ...Categories,
        {
          id: 0,
          name: '自然科学',
        },
        {
          id: 1,
          name: '医药',
        },
      ])
    ).toEqual(Categories)
  })

  it('is unique with nil values removed', () => {
    const Categories = [
      {
        id: 0,
        name: '自然科学',
      },
      {
        id: 1,
        name: '医药',
      },
      {
        id: 2,
        name: '工程科技',
      },
      {
        id: 3,
        name: '人文社会',
      },
    ]

    expect(
      uniqueById([
        ...Categories,
        {
          id: 0,
          name: '自然科学',
        },
        {
          id: 1,
          name: '医药',
        },
        null,
        undefined,
        false,
      ])
    ).toEqual(Categories)
  })
})
