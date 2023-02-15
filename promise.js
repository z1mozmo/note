const promise = new Promise((resolve, reject) => {
  //promise 내부에서 비동기 상황이 종료될 때 resolve 함수 호출
  //promise 내부에서 오류 상황일 때 reject 함수 호출
})





//promise에서는 then을 이용해 비동기 작업 이후 실행할 작업을 지정한다.
function asyncPromisework() {
  // some codes...
  return new Promise((resolve, reject) => {
    //some codes...
    return resolve('complete')
  })
}
//then의 result에는 resolve를 호출하며 넘긴 complete가 들어있다.
asyncPromisework().then(result => console.log(result))





// promise의 then 내에서 promise를 return할 경우 이어진다.
// 계속 체이닝 가능하다.
asyncPromisework()
  .then(result => {
    return promiseNextWork(result)
  }).then(result => {
    return promiseThirdWork(result)
  }).then(result => {
    return promiseFinalWork(result)
  })





//promise chain 중 작업이 실패했을 경우 .catch로 잡을 수 있다.
//catch를 넣지 않을 경우 promise chain 중 에러가 발생했을 때 chain이 멈추니 가급적 넣는 것이 좋다.
Promisework()
  .then(result => {
    return promiseErrorWork(result)
  }).then(result => {
    return promiseThirdWork(result)
  }).then(result => {
    return promiseFinalWork(result)
  }).catch(e => {
    alert('에러가 발생했습니다.')
  })




  
//성공과 실패 여부 상관없이 호출해야하는 코드가 있으면 finally에서 처리한다.
Promisework()
  .then(result => {
    return promiseNextWork(result)
  }).then(result => {
    return promiseThirdWork(result)
  }).then(result => {
    return promiseFinalWork(result)
  }).catch(e => {
    alert('에러가 발생했습니다.')
  }).finally(() => {
    alert('어쨌든 작업은 끝났습니다.')
  })





//기존의 callback 함수를 promise 형태로 만들 수 있다.
//resolve를 작업이 끝나는 순간 호출하면 된다.
const delay = (delayTime) => new Promise((resolve) => {
  setTimeout(resolve, delayTime)
})

delay(5000)
  .then(() => {
    doSomeThing()
    return delay(3000)
  }).then(() => {
    console.log('complete')
  })
  
  