/*
апишите функцию mySort которая будет сортировать список с учетом числовых значений.
!Массив может быть либо числовым либо строчным!
const numeric = [1, 2, 8, 10, 0]
const literals = ['1', '2', '8', '10', '0']
mySort(numeric, 'asc') //[0, 1, 2, 8, 10]
mySort(literals, 'asc') //['0', '1', '10', '2', '8']
mySort(numeric, 'desc') // [10, 8, 2, 1, 0]
mySort(literals, 'desc') //['8', '2', '10', '1', '0']
*/

const numOrLiteralSort=(arr)=>{
    const arrElType=typeof arr[0]
    switch (arrElType){
        case "string":
            return [...arr].sort();
        case "number":
            return [...arr].sort((el1,el2)=>el1-el2);
        default:
            return null
    }
}

const mySort=(arr,flag)=>{
    switch (flag){
        case 'asc':
          return  numOrLiteralSort(arr);
        case 'desc':
            return  numOrLiteralSort(arr).reverse();
        default:
            console.log(`I don't know such comparison function as ${flag}`)
    }
    return null;
}

const numeric = [1, 2, 8, 10, 0]
const literals = ['1', '2', '8', '10', '0']
console.log('mySort(numeric, \'asc\')',mySort(numeric, 'asc'),'[0, 1, 2, 8, 10]')
console.log('mySort(literals, \'asc\')',mySort(literals, 'asc'),'[\'0\', \'1\', \'10\', \'2\', \'8\']')
console.log('mySort(numeric, \'desc\')',mySort(numeric, 'desc'),'[10, 8, 2, 1, 0]')
console.log('mySort(literals, \'desc\')',mySort(literals, 'desc'),'[\'8\', \'2\', \'10\', \'1\', \'0\']')

