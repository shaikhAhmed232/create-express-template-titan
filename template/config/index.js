import convict from "convict";
import mongodbUri from "mongodb-uri";

convict.addFormat({
    name: "mongo-uri",
    validate: (val) => {
        let parsed = mongodbUri.parse(val);
        mongodbUri.format(parsed);
    },
    coerce: (url) => {
        let parsed = mongodbUri.parse(url);
        const urlStr = mongodbUri.format(parsed);
        return urlStr;
    }
})

const conf = convict({
    env: {
        doc: "Get current environment",
        format: String,
        default: "development",
        env: "NODE_ENV",
        arg: "node_env"
    },
    database: {
        doc: "Database string",
        format: "mongo-uri",
        env: "MONGO_URI",
        default: "mongodb://127.0.0.1:27017/my-database"
    },
    port: {
        doc: "Server port",
        format: String,
        env: "PORT",
        default: "3000",
        arg: "port"
    }
})

conf.validate({allowed: true});
Object.assign(conf, conf.get());

export default conf;