const axios = require('axios');
const apiKey = require('./config.js')

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
                           "Cool shirt!",
                           "Your Javascript skills are stellar.",
        ];
      
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
        
    },
      
    getFortune: (req, res) => {
        const fortunes = ["Soon your time will come.", 
                "Your future is bright.",
                "You are coding your future.",
                "The odds are in your favor.",
                "Comfort awaits you.",
        ];
      
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    getGif: (req, res) => {
        axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey.gif_api_key}&tag=funny&rating=g`)
        .then(gifRes => {
            res.status(200).send(gifRes.data.data.images.original.url);
        });
    }
};