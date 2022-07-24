const fs = require('fs')
const express = require('express');

const app = express();

// Middleware between client req and server
app.use(express.json());

// app.get('/', (req, res) => {
//   res.json({ message: 'Hello from the server side!', app: 'Tours'});
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

const newId = tours[tours.length - 1].id + 1;
const newTour = Object.assign({ id: newId }, req.body)

tours.push(newTour);

fs.writeFile( `${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err => {
  res.json({
    status: 'success',
    data: {
      tour: newTour
    }
  })
}

)
})

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
});