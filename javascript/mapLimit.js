function getNameById(id, callback) {
    const randomRequestTime = Math.floor(Math.random() * 1000);
    setTimeout(() => {
        callback("User" + id);
    }, randomRequestTime);
}
const mapLimit = (inputs, limit, iterateeFn, callback) => {
    const result = new Array(inputs.length)
    let resolved = 0
    let nextIndex = 0
    const process = async (index) => {
        nextIndex++
        try {
            iterateeFn(inputs[index], (res) => {
                result[index] = res
                resolved++
                if (resolved === inputs.length) {
                    callback(result)
                    return
                }
                process(nextIndex)
            })
        } catch (e) {
            console.log(e)
            throw (e)
        }
    }

    for (let index = 0; index < Math.min(inputs.length, limit); index++) {
        process(index)
    }

}

mapLimit([1, 2, 3, 4, 5], 1, getNameById, (allResults) => {
    console.log("output", allResults); // ["User1", "User2", "User3", "User4", "User5"]
});
