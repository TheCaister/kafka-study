//  Library for communicating with Kafka

// There are two ways to import it.
// const Kafka = require("kafkajs").Kafka;
// Destructuring
const {Kafka} = require("kafkajs");

run();

// Since we're dealing with Promises, make the functions async
async function run(){

    // To create a Topic, you need to create an Admin Connection. 
    // Establish TCP connection first


    try {
        // clientId can be anything. It just uniquely identifies the client.
        //  You can provide multiple brokers in an array and the client chooses one to connect to.
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers": ["localhost:9092"]
        });

        // Need admin interface to create Topics.
        const admin = kafka.admin();

        // Explicitly connecting. You can also change the config to connect automatically.
        console.log("Connecting...");
        await admin.connect();
        console.log("Connected!");

        // Now, time to create a Topic
        // topics array with individual topics. topic: {topic_name}. You can specify number of partitions
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        });

        console.log("Topic created successfully!");
        await admin.disconnect();

    } catch (error) {
        console.log(`Something bad happened: ${error}`);
    }
    finally{
        process.exit(0);
    }
}