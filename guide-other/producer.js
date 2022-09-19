//  Library for communicating with Kafka

// There are two ways to import it.
// const Kafka = require("kafkajs").Kafka;
// Destructuring
const {Kafka} = require("kafkajs");

// Getting message from user when running from command line
// argv[0] = "node"
// argv[1] = JS file name
const msg = process.argv[2];

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

        // The only difference is to replace "admin" with "producer".
        const producer = kafka.producer();
        // Explicitly connecting. You can also change the config to connect automatically.
        console.log("Connecting...");
        await producer.connect();
        console.log("Connected!");

        // Let's pretend Partition 0: A-M, Partition 1: N-Z.
        const partition = msg[0] < "N" ? 0  : 1;

        // Sending records
        const result = await producer.send({
            "topic": "Users",
            // You can send multiple messages in an array.
            "messages": [
                {
                    "value": msg,
                    "partition": partition
                }
            ]
        });



        console.log(`Message sent successfully! ${JSON.stringify(result)}`);
        await producer.disconnect();

    } catch (error) {
        console.log(`Something bad happened: ${error}`);
    }
    finally{
        process.exit(0);
    }
}