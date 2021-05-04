const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '607c0b0b2259f655645e8514',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                coordinates: [73.84778, 18.52361],
                type: "Point"
            },
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident repellendus voluptates consequatur, optio exercitationem fugit alias dolorum in blanditiis suscipit sed dolorem? Quam ad asperiores veritatis ducimus aliquid soluta nemo.',
            price,
            images: [{
                url: 'https://res.cloudinary.com/dfnbwpcgx/image/upload/v1619347916/YelpCamp/rq42iu2cvzldmjsbd4rf.jpg',
                filename: 'YelpCamp/rq42iu2cvzldmjsbd4rf'
            },
            {
                url: 'https://res.cloudinary.com/dfnbwpcgx/image/upload/v1619347917/YelpCamp/gpuxukpytzsdv6fqpowc.jpg',
                filename: 'YelpCamp/gpuxukpytzsdv6fqpowc'
            }]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})