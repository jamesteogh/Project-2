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

exports.getTour = async (req, res) => {
  // 1) get the data, for the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug });
  // console.log(req.params.slug)
  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
      title: 'Log into your account'
    });
  };

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
      title: 'Sign up account'
    });
  };

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
      title: 'Your account'
    });
  };