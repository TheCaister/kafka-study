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

        // Any consumer that we spin is going to belong to the same group.
        const consumer = kafka.consumer({"groupId": "test"});
        // Explicitly connecting. You can also change the config to connect automatically.
        console.log("Connecting...");
        await consumer.connect();
        console.log("Connected!");


        // Subscribe to topics
        // You can choose to start from the beginning or from the current index.
        consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        });

        // Consumers do long polling
        await consumer.run({
            "eachMessage": async result => {
                console.log(`Received  message ${result.message.value} on partition ${result.partition}`);
            }
        })

    } catch (error) {
        console.log(`Something bad happened: ${error}`);
    }
    finally{
    }
}