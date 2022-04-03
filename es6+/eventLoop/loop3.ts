
fn3()

async function fn3() {
    console.log('task start')
    setTimeout(() => {
        console.log('timer1')
    }, 0)

    let promise1 = new Promise((reslove, reject) => {
        console.log('promise1 padding')
        // try {
        setTimeout(() => {
            console.log('timer2')
            reslove('')
        }, 0)
        // } catch (err) {
        //   reject('promise1 fail1')
        // }
    })
        .then((res) => {
            setTimeout(() => {
                console.log('timer3')
            }, 0)
            console.log('promise1 success1')
        })
        .catch((err) => {
            console.log('promise1 fail1')
        })

    console.log('await start')



    let str = 'a'
    await setTimeout(() => {
        console.log('timer4')
        console.log('await padding')
        str += 'b'

        let promise3 = new Promise((reslove, reject) => {
            console.log('promise3 padding')
            // try {
            setTimeout(() => {
                console.log('timer8')
                reslove('')
            }, 0)
            // } catch (err) {
            //   reject('promise2 fail1')
            // }
        })
            .then((res) => {
                setTimeout(() => {
                    console.log('timer9')
                }, 0)
                console.log('promise3 success1')
            })
            .catch((err) => {
                console.log('promise3 fail1')
            })
    }, 0)
    console.log('await end')
    console.log('str', str)

    let promise2 = new Promise((reslove, reject) => {
        console.log('promise2 padding')
        // try {
        setTimeout(() => {
            console.log('timer5')
            reslove('')
        }, 0)
        // } catch (err) {
        //   reject('promise2 fail1')
        // }
    })
        .then((res) => {
            setTimeout(() => {
                console.log('timer6')
            }, 0)
            console.log('promise2 success1')
        })
        .catch((err) => {
            console.log('promise2 fail1')
        })

    setTimeout(() => {
        console.log('timer7')
    }, 0)

    console.log('task end')
}
