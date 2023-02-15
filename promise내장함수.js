//1. Promise.all(iterable)
const promise1 = delay(1000)
const promise2 = delay(2000)
const promise3 = delay(3000)

//배열로 promise들을 한번에 받아와서 쭉 실행한다.
//api들을 한 번에 여러 개를 병렬로 실행할 때 사용할 수 있다.
Promise.all([promise1, promise2, promise3]).then(() => {
  //promise1~3이 모두 처리된 후 호출
  //제일 긴 작업 delay(3000)이 끝난 후 호출된다.
})





//2. Promise.race(iterable)
//promise들 중 하나라도 resolve 혹은 reject 되면 종료된다.
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const promises = [1, 2, 3, 4, 5].map(n => {
  const delayTime = getRandomInt(1000, 5000)
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${n}번 고양이 완주`)
      resolve(`${n}번 고양이 승리`)
    }, delayTime)
  })
})

Promise.race(promises).then(message => console.log(message))
//ex: 1번 고양이 완주 -> 1번 고양이 승리 -> 3번 완주 -> 5번 완주 -> 4번 완주 -> 2번 완주 순서로 출력





//3. Promise.any(iterable)
//promise들 중 하나라도 resolve 되면 종료된다.(reject 되면 실행 안 됨)
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const promises = [1, 2, 3, 4, 5].map(n => {
  const delayTime = getRandomInt(1000, 5000)
  return new Promise((resolve, reject) => {
    if (n === 1) {
      return reject(`${n}번 고양이 기권`)
    }

    setTimeout(() => {
      console.log(`${n}번 고양이 완주`)
      resolve(`${n}번 고양이 승리`)
    }, delayTime)
  })
})

Promise.any(promises)
  .then(message => console.log(message))
//가장 먼저 promise가 끝났음에도 불구하고 reject(1번 고양이 기권)는 실행되지 않는다.
//ex: 4번 고양이 완주 -> 4번 승리 -> 3번 완주 -> 5번 완주 -> 2번 완주





//4. Promise.allSettled(iterable)
//여러 promise들이 성공했거나 실패했거나 상관 없이 모두 이행된 경우를 처리할 수 있다.
//(다 끝났으면 다 끝난 것으로 처리하는 것)
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const promises = [1, 2, 3, 4, 5].map(n => {
  const delayTime = getRandomInt(1000, 5000)
  return new Promise((resolve, reject) => {
    if (n % 2 === 0) {
      return reject(`${n}번 고양이 완주 실패`)
    }

    setTimeout(() => {
      resolve(`${n}번 고양이 완주`)
    }, delayTime)
  })
})

Promise.allSettled(promises)
  .then(results => console.log(results))
//모든 완주가 끝나고 난 후 결과 출력





//5. Promise.resolve
//주어진 값으로 이행하는 promise.then 객체를 만든다.
//주어진 값이 Promise인 경우 해당 Promise가 반환된다.
//return 타입을 Promise로 맞춰줄 경우 사용하기 요긴하다.
const cached = {
  'roto': 'bassist'
}

const findMember = (memberName) => {
  if (cached[memberName]) {
    return Promise.resolve(cached[memberName])
  }

  return requestAnimationFrame(`/members/${memberName}`).then((member) => {
    cache[member.memberName] = memberName
    return memberName
  })
}

findMember('roto').then((memberName) => console.log(memberName))





//6. Promise.reject
//주어진 값으로 reject처리된 Promise.then 객체를 만든다.
//주어진 값이 Promise인 경우 해당 Promise가 반환된다.
new Promise((resolve, reject) => reject())