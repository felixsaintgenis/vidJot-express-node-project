 const express = require('express');
 const router = express.Router();
 const mongoose = require('mongoose');
 const {ensureAuthentification} = require('../helpers/auth')

 require('../models/Idea');
 const Idea = mongoose.model('Ideas')

 // add Idea form
 router.get('/add', ensureAuthentification, (req, res) => {

   res.render('ideas/add');
 });

 // add Idea page
 router.get('/', ensureAuthentification, (req, res) => {
   Idea.find({user: req.user.id})
   .then(ideas => {
     res.render('ideas/ideas', { ideas: ideas});
   })

   // add edit page
   router.get('/edit/:id', ensureAuthentification, (req, res) => {
     Idea.findOne({
       _id: req.params.id
     })
     .then(idea => {
       if (idea.user != req.user.id) {
         req.flash('error_msg', 'not authorized to modified content')
         res.redirect('/ideas');
       } else {
       res.render('ideas/edit', {
         idea:idea
       });
       }
     });
 });
 });

 // process the add form
 router.post('/', (req, res) => {
   const newUser = {
     title: req.body.title,
     details: req.body.details,
     user: req.user.id
   }
   new Idea(newUser)
   .save()
   .then(idea => {
     res.redirect('/ideas');
   });

 });

 // edit route
 router.post('/edit/:id', (req, res) => {

   Idea.findOne({
       _id: req.params.id
   })
   .then( idea => {
       idea.title = req.body.title;
       idea.details = req.body.details;
       idea.save()
       .then( idea => res.redirect('/ideas'))
     });
   });

 // delete route

   router.post('/delete/:id', (req, res) => {

     Idea.remove({
         _id: req.params.id
     }).then(()=> {
       req.flash('success_msg','Item successfully deleted')
       res.redirect('/ideas')

   });

       });

module.exports = router;
