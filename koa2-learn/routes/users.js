const router = require('koa-router')()
const Person = require('../dbs/models/person')
const Redis = require('koa-redis')
const Store = new Redis().client

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// redis
router.get('/fix', async function(ctx) {
  const st = await Store.hset('fix', 'name', Math.random())
  ctx.body = {
    code: 0
  }
})

// 写
router.post('/addPerson', async function(ctx) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age,
  })
  let code
  try {
    await person.save()
    code = 0
  } catch (error) {
    code = 1
  }
  ctx.body = {
    code
  }
})

// 读
router.post('/getPerson', async function(ctx) {
  const result = await Person.findOne({name:ctx.request.body.name})
  const results = await Person.find({name:ctx.request.body.name})
  ctx.body = {
    code: 0,
    result,
    results
  }
})

//改
router.post('/updatePerson', async function(ctx) {
  const result = await Person.where({
    name:ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })
  ctx.body = {
    code: 0
  }
})

// 删
router.post('/removePerson', async function(ctx) {
  const result = await Person.where({
    name:ctx.request.body.name
  }).remove()
  ctx.body = {
    code: 0
  }
})

module.exports = router
