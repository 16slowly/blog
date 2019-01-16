/**
 * @see https://github.com/vivedu/VIVEDU-Store/issues/372
 */

const faker = require('faker/locale/zh_CN')
const { fakeList } = require('../fakers/list')

module.exports = (router) => {
  router.post('/list', (req, res) => {
    const date = new Date(faker.date.past())

    res.send({
      item: [
        {
          content: {
            news_item: fakeList({
              pageSize: parseInt(req.body.pageSize, 10) || 10,
              page: req.body.page,
            }),
            update_time: date.getTime() / 1000,
          },
        },
      ],
      total_count: 100,
    })
  })
}
