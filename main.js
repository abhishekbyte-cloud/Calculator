let expression = document.querySelector("input")
let numBtn = document.querySelectorAll(".num-btn")
let equalBtn = document.querySelector(".equal-btn")
let clearBtn = document.querySelector(".clear-btn")
let delBtn = document.querySelector(".del-btn")

let isEvaluatedBefore = false

function printBtn(btnOrKey){
    expression.style.fontSize = "30px"
    if(!isEvaluatedBefore){
        expression.value += btnOrKey
    }
    else{
        expression.value = btnOrKey
        isEvaluatedBefore = false
    }
}

function del(){
    expression.value = (expression.value).slice(0, expression.value.length-1)
}

function clear(){
    expression.value = ""
}

function calculate(){
    if(/[a-zA-z]/.test(expression.value)){
        expression.value = "Not a Valid Operation"
        expression.style.fontSize = "20px"
    }
    else{
        if(expression.value != ""){
            let val = expression.value
            let result = eval(expression.value)
            if(isNaN(result)){
                expression.value = "Undefined"
            }
            else if(Math.round(result)==result){
                expression.value = Math.round(result)
            }
            else{
                expression.value = result
            }
        }
        else{
            expression.value = "Nothing to Calculate"
            expression.style.fontSize = "20px"
        }
    }
    isEvaluatedBefore = true
}

document.addEventListener("keydown", function(event){
    if(/^[0-9+*\/.()%{}\[\]-]$/.test(event.key)){
        event.preventDefault()
        printBtn(event.key)
    }
    else if(event.key == "Backspace"){
        event.preventDefault()
        del()
    }
    else if(event.key == "Enter" && event.shiftKey){
        event.preventDefault()
        clear()
    }
    else if(event.key == "Enter" || event.key == "="){
        event.preventDefault()
        calculate()
    }
})

numBtn.forEach(function(numBtn){
    numBtn.addEventListener("click", function(){
        printBtn(this.innerText)
    })
})

delBtn.addEventListener("click", function(){
    del()
})

clearBtn.addEventListener("click", function(){
    clear()
})

equalBtn.addEventListener("click", function(){
    calculate()
})
