/**
 * @see https://github.com/vivedu/VIVEDU-Store/issues/372
 */

const faker = require('faker/locale/zh_CN')

const fakeListItem = (options = {}) =>
  Object.assign(
    {
      author: {
        name: faker.name.findName(),
        slug: options.index,
      },
      date: faker.date.past(),
      title: `Item${options.index}`,
    },
    options
  )

const fakeList = (options = {}) =>
  Array.from(new Array(options.pageSize))
    .map(
      (_, index) =>
        // NOTE: 加上 index ,进一步保证 id 唯一
        faker.random.uuid() + index
    )
    .map((id, index) =>
      Object.assign(
        fakeListItem({ id, index: index + (options.page * options.pageSize)}),
        {
          digest: faker.lorem.paragraph(),
          thumb_url: faker.image.imageUrl(243, 243, undefined, true, true),
          url: faker.image.imageUrl(572, 243, undefined, true, true),
        }
      )
    )

module.exports = { fakeList }
