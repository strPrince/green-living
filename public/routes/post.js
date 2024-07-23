const express = require('express');
const router = express.Router();
const Echo = require('../models/data');

// router.get('/home', async (req, res) => {
//   if (req.session.user) {
//     try {
//       const data = await Echo.find({});
//       if (data.length > 0) {
//         res.render('index', { blogs: data, user: req.session.user });
//         console.log(data);
//       } else {
//         res.render('index', { blogs: [], user: req.session.user });
//         console.log('No data found');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     res.redirect('/auth/login');
//   }
// });

router.get('/post/:id', async (req, res) => {
  if (req.session.user) {
    try {
      const post = await Echo.findById(req.params.id);
      if (post) {
        res.render('postpage', { post: post, user: req.session.user });
        console.log(post);
      } else {
        res.status(404).render('postpage', { post: null, user: req.session.user });
        console.log('Post not found');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
