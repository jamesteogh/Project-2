const Tour = require('../models/tourModel');

exports.getOverview = async (req, res) => {
// 1) Get tour data from collection
  const tours = await Tour.find();

// 2) Build template
// 3) Render that template using tour data from 1

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
};

exports.getTour = (req, res) => {
  // 1) get the data, for the requested tour
  // 2) Build template
  // 3) Render template using data from 1)

  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour'
  });
};