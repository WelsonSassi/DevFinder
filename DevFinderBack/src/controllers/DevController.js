const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if (!dev) {
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiresponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
            return response.json(dev);
        }
        else {
            return response.send('Dev já cadastrado!');
        }
    },

    async update(){
        // Atualizar dados... Name, avatar_url, bio, techs, location
    },

    async destroy(){
        //Excluir do Banco de Dados
    },
};