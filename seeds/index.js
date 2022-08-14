const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++ ){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '62f18bf662741bb0791b2581',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus itaque architecto ullam laborum porro quod voluptas cupiditate. Dolor eius ab inventore earum voluptatibus voluptas quasi repudiandae, incidunt fuga adipisci fugiat?',
            price,
            image: [
                {
                    url: 'https://res.cloudinary.com/dovylvjya/image/upload/v1660380388/YelpCamp/kdcdl6ofjrekuwitvc5l.jpg',
                    filename: 'YelpCamp/kdcdl6ofjrekuwitvc5l',
                },
                {
                    url: 'https://res.cloudinary.com/dovylvjya/image/upload/v1660380386/YelpCamp/cuwqhwdkf1nmd6xjbhjw.jpg',
                    filename: 'YelpCamp/cuwqhwdkf1nmd6xjbhjw',
                },
                {
                    url: 'https://res.cloudinary.com/dovylvjya/image/upload/v1660380387/YelpCamp/wfccfw1ievn1vornwxpv.jpg',
                    filename: 'YelpCamp/wfccfw1ievn1vornwxpv',
                }
              
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})