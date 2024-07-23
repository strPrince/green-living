// routes/home.js
// routes/home.js
const express = require('express');
const router = express.Router();
const items = require('../models/item');

router.get('/', async (req, res) => {
  try {
    const idata = await items.findOne();
    if (idata) {
      res.render('index', { sl_title : idata.sl_title , sl_des: idata.sl_description , sl_img:idata.sl_image,sl_price:idata.sl_price,sf_title:idata.sf_title,sf_des:idata.sf_description,sf_img:idaya.sf_img,sf_price:idata.sf_price });
      console.log(idata);
      console.log(user);
    } else {
      res.render('index', { title: 'No data found', user: req.session.user });
      console.log('No data found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

