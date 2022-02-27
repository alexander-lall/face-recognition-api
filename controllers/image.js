const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "65cca5277620445bad30ff8f67584444",
   });

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(res.status(400).json('unable to work with api'));
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(response => res.json(response[0].entries))
        .catch(err => res.status(400).json('error'));
}

module.exports = { 
    handleImage,
    handleApiCall 
}