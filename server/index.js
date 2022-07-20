const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const ContactList = require('./model/ContactList')

const app = express()

app.use(express.json())
app.use(cors())

// connecting to mongodb database

const DB_URL = 'mongodb+srv://tesfaye:letmein!@cluster1.l14fzld.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connection established...')
})


// creating Post Route

app.post('/add-contact', async(req,res) =>{
    const contactNumber = new ContactList(req.body)
    try {
        await contactNumber.save()
        res.status(201).json({
            status: 'Contact Created',
            data: {
                contactNumber
            }
        })
        
    } catch (error) {
        res.status(500).json({
            status: 'Unable to create Contact List',
            message: error
        })
        
    }
})

// creating GET route

app.get('/get-contact', async(req,res) =>{
    const contactNumbers = await ContactList.find({})
    try {
        res.status(200).json({
            status: 'Success',
            data: {
                contactNumbers
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'Unsuccessful',
            message: error
        })
        
    }
})

//update contact

app.patch('/update-contact/:id', async (req,res) => {
    const updatedContact = await ContactList.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators : true
    })
    try {
        res.status(200).json({
            status : 'success',
            data: {
                updatedContact
            }
        })
    } catch (error) {
        console.log(error)
        
    }
})

// Delete route

app.delete('/delete-contact/:id', async(req,res) =>{
    await ContactList.findByIdAndDelete(req.params.id)

    try {
        res.status(204).json({
            status: 'success',
            data : {}
        })
        
    } catch (error) {
        res.status(500).json({
            status: 'unsuccessful',
            message: error
        })
        
    }
} )

const PORT = 5000

app.listen(PORT, () =>{    
     console.log(`server running on http://localhost:${PORT}`)
})