Spin up ZooKeeper docker container

1. Give container a name using --name.
`docker run --name zookeeper -p 2181:2181 zookeeper`

2. Run Kafka. Write list of environment variables. You need to specify the zookeeper instance, after all. You also need to expose the address of the broker to your producers/consumers.
`docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT={your_machine}:2181 `