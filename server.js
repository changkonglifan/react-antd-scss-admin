const Koa = require('koa')
const path = require('path')
const views = require('koa-views')
const kstatic = require('koa-static')

const app = new Koa()

// assets file
const assetsPath = path.join(__dirname, 'build')
app.use(kstatic(assetsPath))

// views html
app.use(views(path.join(__dirname, 'build'))
)

app.use(async (ctx) => {
  await ctx.render('index.html')
})

app.listen(3000)
console.log("server is  running on port 3000")