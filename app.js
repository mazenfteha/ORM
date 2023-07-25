const express = require('express')

const { sequelize} = require('./models')

const app = express()
app.use(express.json())

const userRouter = require('./routes/users')
const postRouter = require('./routes/posts')

//routes
app.use('/api/v1/users',userRouter)
app.use('/api/v1/posts',postRouter)


app.listen({ port: 5000 },async ()=> {
    console.log('Server running on port 5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})