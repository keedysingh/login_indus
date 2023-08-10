const fs = require('fs');
const dataPath = './data/user.json' 

const getUserData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}

module.exports={getUserData};