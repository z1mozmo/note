// 일반 function으로 쓸 땐 function 앞에 async를 붙여준다.
async function asyncFunction () {
    //await는 함수에 async 키워드가 붙어있어야만 작동한다. 
    //async를 붙이지 않고 await를 사용하면 에러가 발생한다.
    const res = await request(...)
}

//arrow function 형태일 땐 파라미터 앞에 async를 붙여준다.
const asyncFunction = async () {
    const res = await request(...)
}




// async 키워드 함수가 붙은 함수는 return값이 Promise로 wraping된다.
async function asyncRun() {
    return 'hello'
}

function run() {
    return 'hello'
}

console.log(run())  //hello -> 단순히 return값인 string이 출력된다.
console.log(asyncRun())  //Promise {<fulfilled>: 'hello'} ->async가 붙으면 return 값이 Promise가 된다.
asyncRun().then((message) => console.log(message)) //hello -> promise와 동일하게 작동한다.