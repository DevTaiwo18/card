let  displaypin = document.getElementById('generated-pin')
let  networkSelected = document.getElementById('select-network')
let  amountSelected = document.getElementById('select-amount')
let  modaltext = document.getElementById('modal-text')
let table = document.getElementById('tbody')
let insertpin = document.getElementById('insert-pin')
let copiedPin = '';
let copied = ''
let ee ;
let object;
let  generatedpin = []
let arr = []

let currenttime = new Date();
let h = currenttime.getHours().toString().padStart(2, '0');
let m = currenttime.getMinutes().toString().padStart(2, '0');
let s = currenttime.getSeconds().toString().padStart(2, '0');
let dd = currenttime.getDay().toString().padStart(2, '0');
let mm = currenttime.getMonth().toString().padStart(2, '0');
let yy = currenttime.getFullYear().toString().padStart(2, '0');
let session = "am";
let AMpm = currenttime.getHours();

if (AMpm >= 12) {
    session = "pm";
}

let messages = document.querySelector('.modal')


function keep() {
    messages.style.display = 'none'
}

function getrandomnumber(){
    return Math.floor(Math.random() * 9999999999999);
}

function Generate() {

    if (networkSelected.value == 'select-network') {
        messages.style.display = 'block'
        modaltext.innerHTML = 'please select any network'
        return
    }
    else if (amountSelected.value == 'select-amount') {
        messages.style.display = 'block'
        modaltext.innerHTML = 'please select any amount'
        return
    }
    else {
        let newPin = `*312*${getrandomnumber()}#`;
        displaypin.value = newPin;
        copied = displaypin.value;

        object = {
            network: networkSelected.value,
            date: (dd+'/'+mm+'/'+yy),
            time: (h+'/'+m+'/'+s),
            amount: amountSelected.value,
            PrintRef: newPin,
            status: "Unused"
        }

        generatedpin.push(object);
        localStorage.setItem('generatedPins', JSON.stringify(generatedpin));

        display();

        messages.style.display = 'block'
        modaltext.innerHTML = 'Successfully Generated'
    }
    
}

function delet(i) {
    generatedpin.splice(i, 1);
    localStorage.setItem('generatedPins', JSON.stringify(generatedpin));
    display();
}

function store() {
     if (localStorage.getItem('generatedPins')) {
        generatedpin = JSON.parse(localStorage.getItem('generatedPins'));
        
        display();
    }
}
store()


function display() {
    table.innerHTML = ''; 
    generatedpin.forEach(function(el, i) {
        table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${el.network}</td>
                <td>${el.date}</td>  
                <td>${el.amount}</td>
                <td>${el.time}</td>
                <td>${el.PrintRef}</td>
                <td>${el.status}</td>
                <td><button class="red" onclick="delet(${i})">Delete</button></td>
            </tr>
        `;
    });
}

function recharge() {
    let insertvalue = insertpin.value

    for (let i = 0; i < generatedpin.length; i++) {
        let currentPin = generatedpin[i];
        
        if (insertvalue === currentPin.PrintRef) {
            if (!arr.includes(insertvalue)) {
                arr.push(insertvalue);
                messages.style.display = 'block';
                modaltext.innerHTML = 'Recharge Successful';
                insertpin.value = '';
                currentPin.status = 'Used';
                localStorage.setItem('generatedPins', JSON.stringify(generatedpin));
                display();
                return; 
            } else if (arr.includes(insertvalue) && currentPin.status === 'Used') {
                messages.style.display = 'block';
                modaltext.innerHTML = 'Uh oh! This pin has already been used by you!';
                return; 
            }
        }
        else if (insertvalue === '') {
            messages.style.display = 'block';
            modaltext.innerHTML = 'Please insert a pin'; 
        } else {
            messages.style.display = 'block';
            modaltext.innerHTML = 'Invalid Pin, try again';
        }
    }
}


function copy() {
    if (displaypin.value !== '') {
        copiedPin = displaypin.value;
        displaypin.value = '';
    }
}

function paste() {
    insertpin.value = ''
    insertpin.value = copiedPin
}