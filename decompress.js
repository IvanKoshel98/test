const compressedData = [["varyLoooongIDFieldName", "extremelyLooooooooooooongActiveFiedName"],
    [[[0, 1],
        [1, true]],
        [[0, 2],
            [1, false]],
        [[0, 3],
            [1, true]],
        [[0, 4],
            [1, false]],
        [[0, 5],
            [1, false]],
        [[0, 6],
            [1, false]],
        [[0, 7],
            [1, true]],
        [[0, 8],
            [1, true]],
        [[0, 9],
            [1, true]],
        [[0, 10],
            [1, true]]]]

const decompress = (data) => {
    const decompressKeys = [...data[0]]

    const decompressData = [...data[1]]
        .reduce((newArr, obj) => {
            obj.forEach((property, index, arr) => {
                arr[index][0] = decompressKeys[property[0]]
            })
            newArr.push(Object.fromEntries(obj))
            return newArr
        }, [])

    return decompressData

}

console.log(JSON.stringify(decompress(compressedData)))