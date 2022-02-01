//массив правил, чтоб получить требуемый результат.
const articles = [
    {"title": "justo. Praesent luctus. Curabitur", "text": "sapieen, gravida non, sollicitudin a,"}
    , {
        "title": "quam quis diam. Pellentesque",
        "text": "eu odio tristique pharetra. Quisque ac"
    }, {
        "title": "quis lectus. Nullam suscipit,",
        "text": "bibendum. Donec felis orci, adipiscing non, luctus sit"
    }, {
        "title": "Cras dolor dolor, tempus",
        "text": "eget magna. Suspendisse tristique neque"
    }, {
        "title": "ut dolor dapibus gravida.",
        "text": "ultricies adipiscing, enim mi tempor lorem, eget mollis"
    }, {
        "title": "elit. Etiam laoreet, libero",
        "text": "eget metus eu erat semper rutrum."
    }, {
        "title": "velit eu sem. Pellentesque",
        "text": "Aliquam auctor, velit eget laoreet posuere, enim nisl elementum"
    }, {
        "title": "Aliquam ultrices iaculis odio.",
        "text": "ligula consectetuer rhoncus. Nullam velit dui, semper et,"
    }, {
        "title": "a nunc. In at",
        "text": "semper cursus. Integer mollis. Integer tincidunt aliquam arcu. Aliquam ultrices"
    }, {"title": "iaculis quis, pede. Praesent", "text": "mi. Aliquam gravida mauris ut mi. Duis risus"}]

const FILTER_OPERATORS = {
    AND: 'AND',
    OR: 'OR'
}

const textLikeRule = {key: 'text', rule: 'like', params: ['mollis']}
const titleStartLikeRule = {key: 'title', rule: 'sLike', params: ['ve']}
const titleEndLikeRule = {key: 'title', rule: 'eLike', params: ['ur']}
const textRegExpRule = {key: 'text', rule: 'regExp', params: [new RegExp('[e]{2}')]}

const handlerLikeRule = (params, value) => {
    return value.indexOf(params[0]) !== -1;
}
const handlerSLikeRule = (params, value) => {
    return value.startsWith(params[0])
}
const handlerELikeRule = (params, value) => {
    return value.endsWith(params[0])
}
const handlerRegExpRule = (params, value) => {
    return value.search(params[0]) !== -1;
}

const ruleHandlers = {
    'like': handlerLikeRule,
    'sLike': handlerSLikeRule,
    'eLike': handlerELikeRule,
    'regExp': handlerRegExpRule,
}

const myFilter = (handlers) => (items, rules, operator = FILTER_OPERATORS.OR) => {
    let resultArray = [];
    items.forEach((item) => {
        let status = false;
        if (operator === 'OR') {
            status = rules.some((ruleHandlerItem) => {
                return handlers[ruleHandlerItem.rule](ruleHandlerItem.params, item[ruleHandlerItem.key])
            })
        } else {
            status = rules.every((ruleHandlerItem) => {
                return handlers[ruleHandlerItem.rule](ruleHandlerItem.params, item[ruleHandlerItem.key])
            })
        }
        if (status) {
            resultArray.push(item)
        }
    })

    return resultArray;

}

let rez0 = myFilter(ruleHandlers)(articles, [textLikeRule, titleEndLikeRule], FILTER_OPERATORS.OR)
let rez1 = myFilter(ruleHandlers)(articles, [textRegExpRule, titleStartLikeRule])
let rez2 = myFilter(ruleHandlers)(articles, [textRegExpRule, titleEndLikeRule], FILTER_OPERATORS.AND)

console.log(rez0)
console.log(rez1)
console.log(rez2)
