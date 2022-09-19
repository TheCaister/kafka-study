# [Guide](https://www.baeldung.com/ops/kafka-docker-setup)

Starting Kafka server:
`docker-compose up`

Use `nc` command to verify both servers are listening on the respective ports

`nc -z localhost 22181`

`nc -z localhost 29092`

Install kafkajs using `npm install kafkajs`. This should activate IntelliSense.