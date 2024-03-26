const fs = require('fs');
const path = require('path');

let databaseFilePath = "";

function addServer(name, base64String) {
    databaseFilePath = path.join(__dirname, 'public', 'database', 'servers' , `${name}.json`);
    initializeDatabase(name , base64String);
}

function getBase64StringByName(name) {
    const filePath = path.join(__dirname, 'public', 'database', 'servers', `${name}.json`);
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        // console.log(jsonData[1]["base64String"])
        // return jsonData.base64String;
        return jsonData[1]["base64String"];
    } catch (error) {
        console.log('Error reading database file:', error);
        return null;
    }
}

function initializeDatabase(name , base64String) {
    try {
        const data = fs.readFileSync(databaseFilePath, 'utf8');
        console.log('Database file already exists.');
    } catch (error) {
        console.log('Database file not found. Initializing a new database.');
        saveDatabase({'name' : name },{ base64String });
    }
}

function saveDatabase(name , data) {
    let datas = [name,data]
    const jsonData = JSON.stringify(datas, null, 2);
    fs.writeFileSync(databaseFilePath, jsonData, 'utf8');
    console.log('Database saved successfully.');
}

module.exports = {
    addServer,
    getBase64StringByName, // Adding this function to export
    saveDatabase
};
