const db = require(".");

module.exports = () => {
    const collection = db.collection("test-collection");
    const doc = {
        name: "Survivor - Eye of the Tiger",
        duration: 243
    }
    return collection.insertOne(doc);
}