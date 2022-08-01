/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
/* eslint-disable prettier/prettier */
//Tour Handlers
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// param middleware
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
}

// Middleware to check if body contains the name and price property
// If not, return status fail
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price!',
    });
  }
  next();
};


exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    }
  })
}

exports.getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id)
  res.json({
    status: 'success',
    data: {
      tour
    }
  });
}

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour);
  
  fs.writeFile( `${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
};

exports.updateTour = (req, res) => {
  res.json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  });
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
}