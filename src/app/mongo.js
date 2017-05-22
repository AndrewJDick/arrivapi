'use strict';

// Packages
const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');


// Environment Variables
const uri = process.env.MONGODB_URI;


// Dummy data
const insertSeed = (db, closeDb) => {
    db.collection('commutes').insert([{
        psid: '9999999999999999',
        origin: '51.6564890,-0.3903200',
        destination: '51.5238910,-0.0968820',
        arrival: '09:00:00',
        mode: 'transit',
        preference: 'rail'
    },
    {
        psid: '5555555555555555',
        origin: '51.475579,-0.064370',
        destination: '51.5238910,-0.0968820',
        arrival: '11:00:00',
        mode: 'driving',
        preference: ''
    },
    {
        psid: '4444444444444444',
        origin: '51.059771,-1.310142',
        destination: '51.5238910,-0.0968820',
        arrival: '17:03:40',
        mode: 'transit',
        preference: 'bus'
    }], (err, result) => {
        assert.equal(err, null);
        console.log("Inserted seed data into the commutes collection.");
        closeDb();
    });
};


// DB Seed
const isSeeded = (() => {
    mongodb.connect(uri, (err, db) => {
  
        assert.equal(err, null);

        db.listCollections().toArray((err, collections) => {
            let seeded = false;

            for (let collection in collections) {
                if (collections[collection].name === 'commutes') {
                    seeded = true;
                    break;
                }
            }

            if (!seeded) insertSeed(db, () => {
                db.close();
            });
        });
    });
})();


// Add or update a user's commute in the mongoDB commutes collection
const addCommute = (db, commute, callback) => {
    
    db.collection('commutes').updateOne(
        {
            psid : commute.facebook_sender_id 
        },
        {   
            $set: {
                origin: commute.origin,
                destination: commute.destination,
                arrival: commute.time,
                mode: commute.travel_mode,
                preference: commute.transit_mode
            },
            $setOnInsert: { 
                psid: commute.facebook_sender_id
            }
        },
        {   
            upsert : true 
        },
        (err, result) => {
            assert.equal(err, null);

            let addOrUpdate = (result.modifiedCount === 0 && result.upsertedCount === 1) 
                ? 'New user commute added to the commutes collection' 
                : 'Existing user commute updated to the commutes collection';

            console.log(addOrUpdate);
            callback();
        }
    );
};


const dbConnect = (commute, method) => {
    mongodb.connect(uri, (err, db) => {
        
        assert.equal(null, err);
        
        switch(method) {
            case 'addCommute':
                addCommute(db, commute, () => {
                    db.close();
                })
                break;
            default:
                db.close();
                break;
        }
    });
};


// Exports 
exports.dbConnect = dbConnect;