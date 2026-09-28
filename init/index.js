require("dotenv").config({ path: "../.env" });
const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

//const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_URL = process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "6ab553003d243626e685b49c",
        geometry: {
            type: "Point",
            coordinates: [77.2090, 28.6139] // default Delhi coordinates for map
        }
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};

initDB();


