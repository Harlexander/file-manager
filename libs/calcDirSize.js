const { execSync} = require("child_process")


const calcDirSize = fullstaticpath => {

    try {
        let fileSize = execSync(`dir "${fullstaticpath}"`).toString();

        fileSize = fileSize.split("/");
        console.log(fileSize)
    } catch (error) {
        console.log(`Error : ${error}`)
    }

    return [ '100M', 100 * 1024 * 1024]
}

module.exports = calcDirSize