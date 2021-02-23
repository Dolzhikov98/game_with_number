const arr_color = ['red', 'yellow', 'green', 'orange', 'black', 'blue', 'purple', 'pink']
const btn = document.getElementById('btn_start')
window.onload = () => {
    let field_for_game = document.getElementById('field_for_game')
    for (let i = 0; i < 25; i++) {
        let div = document.createElement('div')
        div.className = 'game_block'
        div.style.fontSize = Math.floor(Math.random() * 26) + 14 + 'px'
        div.style.color = arr_color[Math.floor(Math.random() * 9)]
        field_for_game.appendChild(div)
    }
    addNumber()
    process_game()

    function addNumber() {
        let array_div = document.getElementsByClassName('game_block')
        let j = 25
        let arr_rand_num = []
        for (let i = 0; i < 25; i++) {
            arr_rand_num[i] = i + 1
        }
        for (let item of array_div) {
            let rand = Math.floor(Math.random() * j);
            j--
            item.innerHTML = arr_rand_num[rand]
            arr_rand_num.splice(rand, 1)
        }
    }

    function process_game() {
        let array_div = document.getElementsByClassName('game_block')
        step = 1
        for (let item of array_div) {
            item.addEventListener('click', () => {
                if (item.innerHTML == String(step)) {
                    console.log(item.innerHTML)
                    console.log(toString(step))
                    item.style.backgroundColor = 'red'
                    item.style.color = 'white'
                    step++
                }
            })
        }
    }

    const timer = function() {
        btn.disabled = true
        let timer_num = document.getElementById('timer')
        let count = 50
        timer_num.innerHTML = `Времени осталось: ${count}`

        let interval = setInterval(() => {
            if (count != 0) {
                timer_num.innerHTML = `Времени осталось: ${--count }`
                let array_div = document.getElementsByClassName('game_block')
                for (let item of array_div) {
                    if (item.innerHTML == '25' && item.style.backgroundColor == 'red') {
                        let timer_num = document.getElementById('timer')
                        timer_num.innerHTML = 'Вы победили!'
                        clearInterval(interval)
                        btn.disabled = false
                    }
                }

            } else if (count == 0) {
                timer_num.innerHTML = 'Вы проиграли!'
                clearInterval(interval)
                btn.disabled = false
            }
        }, 1000)
    }


    btn.addEventListener('click', () => {
        let array_div = document.getElementsByClassName('game_block')
        for (let item of array_div) {
            addNumber()
            item.style.fontSize = Math.floor(Math.random() * 26) + 14 + 'px'
            item.style.backgroundColor = 'white'
            item.style.color = arr_color[Math.floor(Math.random() * 9)]
        }
        process_game()
        timer()
    })
}