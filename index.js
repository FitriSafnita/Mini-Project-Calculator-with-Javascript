// deklarasikan semua class
const displayHistory = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const clearAll = document.querySelector(".clear-all");
const clearLast = document.querySelector(".last-entity-clear");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");


let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

// mengambil nilai dot "." yang diinputkan
numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if(e.target.innerText === "." && !haveDot){
            console.log(e.target.innerText)
            haveDot = true;
        } else if(e.target.innerText === "." && haveDot){
            console.log(e.target.innerText)
            return;
        }
        // untuk menambah inputan ke display 
        // "+=" berfungsi untuk menambahakn angka berikutnya 
        // bukan mengganti angka
        dis2Num += e.target.innerText; 
        display.innerText = dis2Num;
    })
});

operations.forEach((operation) => {
    operation.addEventListener("click", (e) =>{
        if(!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(dis1Num && dis2Num && lastOperation){
            console.log("Menjalankan operasi matematika")
            mathOperation()
        } else{
            result = parseFloat (dis2Num);
        }
        clearVar(operationName)
        lastOperation = operationName
    })
})
function clearVar(name = ""){
    dis1Num += dis2Num + " " + name + " ";
    displayHistory.innerText = dis1Num;
    display.innerText = "";
    dis2Num = "";
    tempResult.innerText = result;
}

function mathOperation() {
    if (lastOperation === "X"){
        result = parseFloat(result) * parseFloat(dis2Num)
    }else if (lastOperation === "+"){
        result = parseFloat(result) + parseFloat(dis2Num)
    }
    else if (lastOperation === "-"){
        result = parseFloat(result) - parseFloat(dis2Num)
    }
    else if (lastOperation === "/"){
        result = parseFloat(result) / parseFloat(dis2Num)
    }else if (lastOperation === "%"){
        result = parseFloat(result) % parseFloat(dis2Num)
    }
}

// fungsi "=" atau equal
equal.addEventListener("click", (e =>{
    if (!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display.innerText = result;
    tempResult.innerText = "";
    dis2Num = result;
    dis1Num = "";
}));

// fungsi clear semua
clearAll.addEventListener("click", () =>{
    dis1Num = "";
    dis2Num = "";
    haveDot = false;
    displayHistory.innerText = "";
    display.innerText = "";
    tempResult.innerText = "";
    result = "";
    lastOperation = "";
})

// fungsi clear terakhir
clearLast.addEventListener("click", () =>{
    display.innerText = "";
    dis2Num = "";
})

// fungsi untuk keyboard
window.addEventListener("keydown", (e) =>{
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" 
    ) {
        clickButton (e.key)
    } else if(
        e.key === "+" || 
        e.key === "-" || 
        e.key === "/" ||
        e.key === "%"
    ){
        clickOperation(e.key);
    } else if (e.key === "*"){
        clickOperation("X")
    } else if (e.key === "Enter" || e.key === "="){
        clickEqual("equal")
    }else if (e.key === "Backspace"){
        clickClear()
    }
})

function clickButton(key){
    numbers.forEach((button) => {
        if (button.innerText === key) {
            button.click()
        }
    })
}

function clickOperation(key) {
    operations.forEach((operation) => {
        if (operation.innerText === key) {
            operation.click()
        }
    })
}

function clickEqual(){
    equal.click()
}

function clickClear(){
    clearAll.click()
}