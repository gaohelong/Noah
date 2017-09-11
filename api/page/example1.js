/* mock */
const Mock = require('mockjs');
const Random = Mock.Random;

/* faker */
const faker = require('faker');

/* data */
let id = 1;
const list = Mock.mock({
    'code': 0,
    'msg': '获取成功',
    'total': 300,
    'list|300': [
        {
            'key|+1': id,
            'id|+1': id,
            'name': faker.name.firstName,
            // 'name': Random.cname(),
            'age|20-99': 20,
            'address|1': [
                Random.county(true),
                Random.county(true),
                Random.county(true),
                Random.county(true),
                Random.county(true),
                Random.county(true),
                Random.county(true),
                Random.county(true),
                Random.county(true),
                Random.county(true)
            ],
            'desc|1': [
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6),
                Random.cparagraph(1, 6)
            ],
            'date|1': [
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd'),
                Random.datetime('yyyy-MM-dd')
            ]
        }
    ]
});

/* export */
module.exports = list;
