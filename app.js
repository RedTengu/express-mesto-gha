const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb');