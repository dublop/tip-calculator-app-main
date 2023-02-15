const billInput = document.querySelector('#bill');
const peopleInput = document.querySelector('#people');

const alert = document.querySelector('.alert');

const amount = document.querySelector('#amount');
const total = document.querySelector('#total');
const tipBtns = document.querySelectorAll('.btn');
const resetBtn = document.querySelector('.resetBtn');
const customTip = document.querySelector('#custom');

let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

billInput.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
customTip.addEventListener('input', setTipCustomValue);
peopleInput.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);


function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue() {
    if(billInput.value.includes(',')){
        billInput.value = billInput.value.replace(',', '.');
    }

    if (!validateFloat(billInput.value)) {
        billInput.value = billInput.value.substring(0, billInput.value.lenght-1);
    }

    billValue = parseFloat(billInput.value);
    //console.log(billValue);
    calculateTip();
}

function handleClick(e){
    tipValue = parseFloat(e.target.value) / 100;
    //console.log(tipValue);
    calculateTip();
    // clear custom input
    customTip.value = ""
    
}

function setTipCustomValue() {
    if(!validateInt(customTip.value)){
        customTip.value = customTip.value.substring(0, customTip.value.lenght-1);
    }
    tipValue = parseFloat(customTip.value) / 100;
    //console.log(tipValue);
    if(customTip.value !== '') {
        calculateTip();
    }
}

function setPeopleValue() {
    if(!validateInt(peopleInput.value)){
        peopleInput.value = peopleInput.value.substring(0, peopleInput.value.lenght-1);
    }
    peopleValue = parseFloat(peopleInput.value);
    if(peopleValue <= 0){
        alert.classList.remove('hidden');
    } else {
        alert.classList.add('hidden');
    }
    //console.log(peopleValue);
    calculateTip();
}

function calculateTip() {
    if(peopleValue >=1) {
        let tipAmount = billValue * tipValue / peopleValue;
        let totalAmount = billValue * (tipValue + 1) / peopleValue;

        amount.innerHTML = '$' + tipAmount.toFixed(2);
        total.innerHTML = '$' + totalAmount.toFixed(2);
    }
}

function reset() {
    billInput.value = '0.0';
    setBillValue();
    tipBtns[2].click();
    peopleInput.value = '1';
    setPeopleValue();

}