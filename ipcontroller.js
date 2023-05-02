const client = require("../helper/redis");
const axios = require("axios");

const user= require("../models/usermodel");
const ip=require("../models/citymodel")
const API_KEY = process.env.OW_API_KEY;

const city = async (req, res) => {

    try {


        const city = req.params.city || req.body.city;


        const isCityCache = await client.get(`${city}`);

        console.log(isCityCache)

        if (isCityCache) return res.status(200).send({ data: isCityCache });


        const response = await axios.get(`https://ipapi.co/api/#introduction${API_KEY}&q=${city}`)


        const ipData = response.data;


        console.log(ipData)

        client.set(city, JSON.stringify(ipData), { EX: 30 * 60 });


        await ip.findOneAndUpdate({ userId: req.body.userId }, {
            userId: req.body.userId, $push: { previousSearches: city }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })


        return res.send({ data: ipData });

    } catch (err) {
        return res.status(500).send(err.messsage);
    }

}


const presentcity = async (req, res) => {
    
    try {

        const cities = await ip.aggregate([
            
            {
                 $match: { 
                    userId: req.body.userId
                } 
            },
            
            {
                $unwind: "$previousSearches"
            }
            ,
            {
                $group: {
                    _id: "$previousSearches",
                    count: { $sum: 1 }
                }
            },

            {
                $sort: { count: -1 }
            }
            ]);



        const city = cities[0]["_id"]

        const isCityCache = await client.get(`${city}`);

        // console.log(isCityInCache)

        if (isCityCache) return res.status(200).send({ data: isCityCache });


        const response = await axios.get(`https://ipapi.co/api/#introduction${API_KEY}&q=${city}`)


        const ipData = response.data;


        // console.log(weatherData)

        client.set(city, JSON.stringify(ipData), { EX: 30 * 60 });


        await ip.findOneAndUpdate({ userId: req.body.userId }, {
            userId: req.body.userId, $push: { previousSearches: city }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })


        return res.send({ data: ipData });

    } catch (err) {
        return res.status(500).send(err.messsage);
    }

}

module.exports = {presentcity,city};