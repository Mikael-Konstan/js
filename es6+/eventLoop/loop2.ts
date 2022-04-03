fn2()

function fn2() {
    // setTimeout(() => {
    //   console.log('timer')
    // })
    let promise = new Promise((reslove, reject) => {
        console.log('promise padding')
        reslove('')
    })
        .then((res) => {
            setTimeout(() => {
                console.log('timer1Then')
            }, 0)
            console.log('promise success')
        })
        .catch((err) => {
            console.log('promise fail')
        })

    let promise2 = new Promise((reslove, reject) => {
        console.log('promise2 padding')
        let xhr = new XMLHttpRequest()
        xhr.open('get', './README.md')
        xhr.send()
        xhr.onreadystatechange = (res) => {
            // console.log(xhr.readyState)
            // console.log(res)
            // console.log(res.status)
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('res', res)

                setTimeout(() => {
                    console.log('timer5')
                    reslove(res)
                }, 1000)
            }
        }
    })
        .then((res) => {
            setTimeout(() => {
                console.log('timer2Then')
            }, 0)
            console.log('promise2 success')
        })
        .catch((err) => {
            console.log('promise2 fail')
        })
    setTimeout(() => {
        console.log('timer4')
    }, 0)
}
