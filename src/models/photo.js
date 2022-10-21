const {Schema, model} = require ('mongoose');

const Photo = new Schema({
    imageURL: String,
    public_id: String
});

module.exports = model ('Photo', Photo);