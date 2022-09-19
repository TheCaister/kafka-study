Spin up ZooKeeper docker container

1. Give container a name using --name.
`docker run --name zookeeper -p 2181:2181 zookeeper`
docker run --name zookeeper  -p 2181:2181 zookeeper

2. Run Kafka. Write list of environment variables. You need to specify the zookeeper instance, after all. You also need to expose the address of the broker to your producers/consumers. PLAINTEXT:// processes messages without encryption. By default, the ZooKeeper spins up three copied topics(?). The image lives in Confluent, the company that maintains it. 
`docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT={your_machine}:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://{your_machine}:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka`

`docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=localhost:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka`

docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=husseinmac:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://husseinmac:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka 

Usually, you don't have to worry about what the ZooKeeper is up to as it just works in the background.

OptiPlex-3020M

---

## Other Guide
