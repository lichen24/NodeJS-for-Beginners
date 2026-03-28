import express from 'express'
import bodyParser from 'body-parser'
import {getAll, getById, create, updateById, deleteById} from './store.js'

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.get('/about', async (req, res) => {
    const whispers = await getAll()
    res.render('about', { whispers })
})

app.get(`/api/v1/whisper`, async (req, res) => {
    const whispers = await getAll()
    res.json(whispers)
});


app.get(`/api/v1/whisper/:id`, async(req, res) => {
    const id = parseInt(req.params.id)
    const whisper = await getById(id)
    if (!whisper) {
        return res.sendStatus(404)
    } else {
        return res.json(whisper)
    }
});

app.post(`/api/v1/whisper`, async(req, res)=> {
    const {message} = req.body;
    if (!message) {
        res.sendStatus(400);  
    } else {
        const whisper = await create(message)
        res.status(201).json(whisper)   
    } 
})

app.put(`/api/v1/whisper/:id`, async (req, res) => {
    const {message} = req.body
    const id = parseInt(req.params.id)
    if (!message) {
        res.sendStatus(400)
    } else {
        const whisper = await getById(id)
        if (!whisper ) {
            res.sendStatus(404)
        } else {
            await updateById(id, message)
            res.sendStatus(200)
        } 
    } 
});

app.delete(`/api/v1/whisper/:id`, async (req, res) => {
    const id = parseInt(req.params.id)
    const whisper = await getById(id)
    if (!whisper) {
        res.sendStatus(404)
        return
    }
    await deleteById(id)
    res.sendStatus(200)
});

/*app.get('/api/v1/whisper', (req, res) => {
  const id = parseInt(req.params.id)
  res.json({id})
})

app.post('/api/v1/whisper', (req, res) => {
  res.status(201).json(req.body)
})

app.put('/api/v1/whisper/:id', (req, res) => {
  res.sendStatus(200)
})

app.delete('/api/v1/whisper/:id', (req, res) => {
  res.sendStatus(200)
})*/

//1. catch-all 404 handler
app.use((req, res) => {
  if (req.originalUrl.includes('api')) {
    return res.status(404).json({ error: 'Not Found' })
  } else {
    return res.status(404).send('Not Found')
  }
})

//  2. Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)

  if (req.originalUrl.includes('api')) {
    return res.status(500).json({ error: 'Internal Server Error' })
  } else {
    return res.status(500).send('Internal Server Error')
  }
})

export { app }
