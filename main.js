const expression = document.querySelector("input")
const numBtn = document.querySelectorAll(".num-btn")
const equalBtn = document.querySelector(".equal-btn")
const clearBtn = document.querySelector(".clear-btn")
const delBtn = document.querySelector(".del-btn")

let isEvaluatedBefore = false

function printBtn(btnOrKey){
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
    if(expression.value === ""){
        expression.value = "Nothing to Calculate"
    }
    else{
        try{
            const result = eval(expression.value)

            if(result === Infinity || result === -Infinity){
                expression.value = result
            }
            else if((!Number.isFinite(result))){
                expression.value = "undefined"
            }
            else{
                expression.value = result
            }
        }
        catch{
            if(expression.value !== "Nothing to Calculate" && expression.value !== "undefined"){
                expression.value = "Not a Valid Operation"
            }
        }
    }
    isEvaluatedBefore = true
}

document.addEventListener("keydown", function(event){
    const allowedKeys = "0123456789+-*/.%"
    if(allowedKeys.includes(event.key)){
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
