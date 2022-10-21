const {Router} = require('express');
const cloudinary = require('cloudinary');
const Photo = require('../models/Photo');
cloudinary.config({
    cloud_name: 'divafvufx',
    api_key: '636629729969289',
    api_secret: 'sxxdMvXR2MmcOtlShOSjutyru3Y',
})
const fs = require('fs-extra');
const router = Router();


router.get('/', (req, res) =>{
    res.render('index');
});

router.post('/upload',async (req, res) =>{
    console.log(req.file);
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result)
    const newPhoto = new Photo({
        imageUrl: result.url,
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.send('uploaded');
});
module.exports = router;