var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
var S = require('string');

/* POST country */
router.post('/new', async function(req, res, next) {
  try{
    let neighbouring_countries = req.body.neighbouring_countries.split(',');
    req.body.name = S(req.body.name).capitalize().s;
    req.body.ethnicity.split(',').map(ele=>ele.trim());
    req.body.neighbouring_countries = [];
    var createdCountry = await Country.create(req.body);
    for(let eachCountry of neighbouring_countries){
      eachCountry = S(eachCountry).capitalize().s;
        let  country= await Country.findOne({name:eachCountry.trim()});
        if(country){
            req.body.neighbouring_countries.push(country.id);
            await Country.findByIdAndUpdate(country.id, {$push:{neighbouring_countries:createdCountry.id}})
        }
    }
    var country = await Country.findByIdAndUpdate(createdCountry.id, req.body, {new: true});
    res.status(404).json(country);
  }catch(err){
    next(err)
  }
});

// GET country in asc/desc
router.get('/sortby', async(req, res, next) => {
  const type = req.query.type;
  if(type === "asc"){
    let countries = await Country.aggregate([
      {$sort:{name: 1}}
    ])
    res.send(countries)
  }else if(type === "desc"){
    let countries = await Country.aggregate([
      {$sort:{name: -1}}
    ])
    res.send(countries)
  }
})
s

module.exports = router;