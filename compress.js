const data = [{
    "varyLoooongIDFieldName": 1,
    "extremelyLooooooooooooongActiveFiedName": true
}, {"varyLoooongIDFieldName": 2, "extremelyLooooooooooooongActiveFiedName": false}, {
    "varyLoooongIDFieldName": 3,
    "extremelyLooooooooooooongActiveFiedName": true
}, {"varyLoooongIDFieldName": 4, "extremelyLooooooooooooongActiveFiedName": false}, {
    "varyLoooongIDFieldName": 5,
    "extremelyLooooooooooooongActiveFiedName": false
}, {"varyLoooongIDFieldName": 6, "extremelyLooooooooooooongActiveFiedName": false}, {
    "varyLoooongIDFieldName": 7,
    "extremelyLooooooooooooongActiveFiedName": true
}, {"varyLoooongIDFieldName": 8, "extremelyLooooooooooooongActiveFiedName": true}, {
    "varyLoooongIDFieldName": 9,
    "extremelyLooooooooooooongActiveFiedName": true
}, {"varyLoooongIDFieldName": 10, "extremelyLooooooooooooongActiveFiedName": true}]

const compress = (data) => {

    const compressKeysSet = new Set();
    data.forEach(
        (obj) =>
            Object.keys(obj).forEach(
                (key) =>
                    compressKeysSet.add(key)
            )
    )
    const compressKeys = Array.from(compressKeysSet)

    const myData = data.map((obj) => Object.entries(obj))

    const replacer = (array) => {
        array.forEach((item, index, arr) => {
            if (Array.isArray(item)) {
                replacer(item)
            }
            if (compressKeys.indexOf(item) !== -1) {
                arr[index] = compressKeys.indexOf(item)
            }
        })
    }
    replacer(myData)
    return [compressKeys, myData]

}
compress(data)