const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())



const users = []

app.get('/order', (request, response) => {
        
    return response.json(users)
})


app.post('/order', (request, response) => {
    const { order, clientName, price, status } = request.body

    const user = { id:uuid.v4(), order, clientName, price, status }

    users.push(user)
        
    return response.status(201).json(users)
})


app.put('/order/:id', (request, response) => {
    const {id} = request.params
    const { order, clientName, price, status } = request.body

    const updateOrder = { id, order, clientName, price, status }

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }

    users[index] = updateOrder

            
    return response.json(updateOrder)
})

app.delete('/order/:id', (request, response) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ message: "User not found"})
    }

    users.splice( index,1)
        
    return response.status(204).json()
})

app.get('/order/:id',(request, response) => {
    const { id } = request.params
    const { order, clientName, price, status } = request.body
    
    const index = users.find(user => user.id === id)
    
       

    return response.json(index)
    

})

app.patch('/order/:id', (request, response) => {
    const {id} = request.params
    const updateStatus = ({id, status: "Pronto"})

    const index = users.findIndex(user => user.id === id)

    users[index].status = "Pronto"


            
    return response.json(users[index])
})













app.listen(port, () =>{
    console.log(`🟢 Server started on port ${port}`)
})