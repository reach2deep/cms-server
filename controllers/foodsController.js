const Food = require('../models/Food');
const config = require('../config/config');
const nodemailer = require('nodemailer');


exports.findAll = async (req,res) => {

    await Food.find()
    .then(foods => {
        res.send(foods);
    }).catch(err =>{
        res.status(500).send(
            {
                message : err.message || "Error occured while retriving foods."
            }
        )
    })
}

exports.findOne = async (req,res) =>{

    await Food.findById(req.params.id)
    .then(food => {
        if(!food) {
            return res.status(404).send({
                message : "Food not found with id " + req.params.id
            });

        }
        res.send(food)
    }).catch(err =>{
        return res.status(500).send({ 
            message : "Error retrieving food with id " + req.params.id
        })
    });    


}

exports.createFood = async (req,res) => {
    const {name,description,price} = req.body;

    console.log(req.body)

    let food = await Food.findOne({name});
        if(food){
            return res.status(400).send({
                message :  "Food name already exists"
            });
        }

        food = new Food({
            name,  
            description, 
            price
        });

        await food.save()
        .then(food =>{
            res.send(food);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while creating food"
            });
        })

        
}


exports.updateFood = async (req,res) => {
    const {name,description,price} = req.body;

    await Food.findByIdAndUpdate(req.params.id,{
        name , description, price 
    }, {new: true})
    .then(food =>{
        if(!food) {
            return res.status(404).send({
                message : "Food not found with Id " + req.params.id
            })
        }

        res.send(food);
    }).catch(err => {
        return res.status(500).send({
            message : "Error updating food with id " + req.params.id
        })
    });

}

exports.deleteFood = async (req,res) => {

   await Food.findByIdAndRemove(req.params.id)
    .then(food =>{
        if(!food){
            return res.status(404).send({
                message : "Food not found with id " + req.params.id
            });

            res.send({
                message : "Food deleted successfully"
            })
        }
    }).catch(err =>{
        return res.status(500).send({
            message: "Could not delete food with id " + req.params.id
    })
    });

}