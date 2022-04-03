let obj = {
    a: 1,
    b: 'bb',
    c: false
}

// proxy set 修改对象
// proxy get 获取对象
// proxy has 判断对象是否有该属性

const setHandler = {
    set(target, key, value) {
        if ((key === 'c') && ((value % 2) !== 0)) {
            console.log('object must have an even boolean of c');
        } else {
            return Reflect.set(target, key, value);
        }
    }
}
const getHandler = {
    get(target, key, receiver) {
        if (key === 'b') {
            return `${target[key]} ... ccc!`;
        }
        return Reflect.get(target, key, receiver);
    }
}
const hasHandler = {
    has(target, key) {
        if (key === 'a') {
            return false
        }
        return key in target;
    }
}

let objProxy = new Proxy(obj, {
    ...setHandler,
    ...getHandler,
    ...hasHandler,
});



objProxy.c = 3;
let testKey = 'a';
console.log(testKey in obj)
console.log(testKey in objProxy)

console.log(objProxy.b)
console.log(objProxy.c)
