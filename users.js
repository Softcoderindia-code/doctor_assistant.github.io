const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");

const todoContainer = document.getElementById('pt');

// $('.enter_link').click(function() { 
//     $(this).parent().fadeOut(500);
// });
function loadbody() {
    // console.log('body is loaded');
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleDateString('default', { weekday: 'long' });

    spanDate.innerText = myDate;
    spanMonth.innerText = month;
    spanYear.innerText = year;
    spanWeekday.innerText = day;

}

// checking if user is signed in or not
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user is signed in at users.html');
    }
    else {
        alert('your login session has expired or you have logged out, login again to continue');
        location = "index.html";
    }
})

// retriving todos
function renderData(individualDoc) {

    // parent div
    let parentDiv = document.createElement("div");
    parentDiv.className = "container todo-box";
    parentDiv.setAttribute('data-id', individualDoc.id);
    

    // todo div
    
    var tbody = document.getElementById('tableBody')
    var trow = document.createElement('tr')
    let td1 = document.createElement("td");
    var td2 = document.createElement('td')
    var td3 = document.createElement('td')
    var Name = document.createElement('div')
    var td4 = document.createElement('td')
    var td5 = document.createElement('td')
    var td6 = document.createElement('td')
    var td7 = document.createElement('button')
    var dropdown = document.getElementById('medilist')
    // var add_coloumn = document.createElement('button')

    
    // var link = document.createElement('a')
    // var td6 = document.createElement('button')
    // td1.innerHTML= ++std
    var std = 0;
    td1.innerHTML = ++std;
    td2.innerHTML= individualDoc.data().opd;
    td3.innerHTML= individualDoc.data().ptname;
    Name.innerHTML= individualDoc.data().ptname;
    td4.innerHTML= individualDoc.data().age;
    td5.innerHTML= individualDoc.data().dia;
    td6.innerHTML= individualDoc.data().treat;
    td7.innerHTML= 'files';
    // td7.className('btn')
    // td7.href(individualDoc.data().link)
    // td6.innerHTML = "Delete";
    // td6.id = 
    trow.appendChild(td1)
    trow.appendChild(td2)
    trow.appendChild(td3)
    trow.appendChild(td4)
    trow.appendChild(td5)
    trow.appendChild(td6)
    trow.appendChild(td7)
    // td7.appendChild(link)
    // trow.appendChild(td6)
    // trow.appendChild(td6)
    tbody.appendChild(trow)
    // var ddl = document.getElementById("ddlFruits");
    var option = document.createElement("OPTION");
    option.innerHTML = individualDoc.data().treat;
    option.value = individualDoc.data().treat;
    dropdown.options.add(option);



    // button
    let trash = document.createElement("button");

    let i = document.createElement("i");
    i.className = "fas fa-trash";

    // appending
    trash.appendChild(i);

    let edit = document.createElement("button")
    let editi = document.createElement("i");

    editi.className = "far fa-edit";

    edit.appendChild(editi)

    let add = document.createElement("button");
    let addi = document.createElement("i")

    addi.className="fas fa-plus"
    add.appendChild(addi)

    parentDiv.appendChild(Name);
    parentDiv.appendChild(trash);
    parentDiv.appendChild(edit);
    parentDiv.appendChild(add);

    // todoContainer.innerHTML += `
    //     <div class="container todo-box" id ="${individualDoc.doc.id}">
    //       <div>${individualDoc.doc.data().todos}</div>
    //       <button onClick="deleteTodo('${individualDoc.doc.id}','${user.uid}')"><i class='fas fa-trash'></i></button>
    //     </div>
    //     `
    todoContainer.appendChild(parentDiv);

    td7.addEventListener('click', e =>{
        window.open(individualDoc.data().link, "_blank");
    })
    function reload(){
        window.location.reload()
    }
    // trash clicking event
    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection(user.uid).doc(id).delete();
            }
        alert('Succesfully deleted please wait 3 seconds')
        setTimeout(reload, 3000)
        })
        
    })
    edit.addEventListener('click',e=>{
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                const opd= individualDoc.data().opd;
                const ptname= individualDoc.data().ptname;
                const age= individualDoc.data().age;
                const dia= individualDoc.data().dia;
                const treat= individualDoc.data().treat;
                const link= individualDoc.data().link;
                
                const copd = document.getElementById('opd')
                const cptname = document.getElementById('ptname')
                const cage = document.getElementById('age')
                const cdia = document.getElementById('dia')
                const ctreat = document.getElementById('treat')
                const clink = document.getElementById('link')
                
                copd.value = opd
                cptname.value = ptname
                cage.value = age
                cdia.value = dia
                ctreat.value = treat
                clink.value = link
                
                var add = document.getElementById("Add")
                add.addEventListener('click',e=>{
                    alert("Succecfully edited please wait 3 seconds")
                    setTimeout(reload, 3000)
                    fs.collection(user.uid).doc(id).delete();
                })
                
                
            }
            
            
            // alert('please wait 3 seconds')
            // setTimeout(reload, 3000)

        })        
    })
    add.addEventListener('click',e=>{
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                const opd= individualDoc.data().opd;
                const ptname= individualDoc.data().ptname;
                const age= individualDoc.data().age;
                const dia= individualDoc.data().dia;
                const treat= individualDoc.data().treat;
                const link= individualDoc.data().link;
                
                const copd = document.getElementById('opd')
                const cptname = document.getElementById('ptname')
                const cage = document.getElementById('age')
                const cdia = document.getElementById('dia')
                const ctreat = document.getElementById('treat')
                const clink = document.getElementById('link')
                
                copd.value = opd
                cptname.value = ptname
                cage.value = age
                cdia.value = dia
                ctreat.value = treat
                clink.value = link               
            }
            
        })        
    })
}

// retriving username
auth.onAuthStateChanged(user => {
    const username = document.getElementById('username');
    if (user) {
        fs.collection('users').doc(user.uid).get().then((snapshot) => {
            // console.log(snapshot.data().Name);
            username.innerText = snapshot.data().Name;
        })
    }
    else {
        // console.log('user is not signed in to retrive username');
    }
})

// adding todos to firestore database
const form = document.getElementById('form');
let date = new Date();
let time = date.getTime();
let counter = time;
let id = counter += 1;
var coloumn = document.getElementById('column')
// coloumn.addEventListener('click', e=>{
//     // const new_column = document.createElement('input')
//     const new_column = prompt("Please tell it's id");
//     if (new_column != null) {
//         const column = document.createElement('input')
//         column.id = new_column
//         form.appendChild(column)
//       }
// })
form.addEventListener('submit', e => {
    e.preventDefault();
    const opd = form['opd'].value;
    const ptname = form['ptname'].value;
    const age = form['age'].value;
    const dia = form['dia'].value;
    const treat = form['treat'].value;
    const link = form['link'].value;
    // const new_column = form['column'].value

    // const todos = form['opd'].value;
    // console.log(todos);
    // const form = document.getElementById('form');
    // var value = document.getElementById('medi')
    // var option = document.createElement("option");
    // option.text = "Kiwi";
    // value.add(option);
    
    let id = counter += 1;
    form.reset();
    auth.onAuthStateChanged(user => {
        if (user) {
            fs.collection(user.uid).doc('_' + id).set({
                id: '_' + id,
                opd,
                ptname,
                age,
                dia,
                treat,
                link
                // new_column
            }).then(() => {
                console.log('todo added');
            }).catch(err => {
                console.log(err.message);
            })
        }
        else {
            // console.log('user is not signed in to add todos');
        }
    })
    // adddropdown()
})

// logout
function logout() {
    auth.signOut();
}

// realtime listners
auth.onAuthStateChanged(user => {
    if (user) {
        fs.collection(user.uid).onSnapshot((snapshot) => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == "added") {
                    renderData(change.doc);
                }
                else if (change.type == 'removed') {
                    let li = todoContainer.querySelector('[data-id=' + change.doc.id + ']');
                    todoContainer.removeChild(li);
                }
            })
        })
    }
})


function change(){
    // const form = document.getElementById('form')
    // const treat = form['treat'].value;
    var medi = document.getElementById("medilist");
    var selectedText = medi.options[medi.selectedIndex].text;
    document.getElementById("treat").value = selectedText;
}

function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

// function hadd(individualDoc){
//     let hparentDiv = document.createElement("div");
//     hparentDiv.className = "container todo-box";
//     hparentDiv.setAttribute('data-id', individualDoc.id);
    
//     // var htbody = document.getElementById('htableBody')
//     // var htrow = document.createElement('tr')
//     // let htd1 = document.createElement("td");
//     var htd2 = document.createElement('td')
//     var htd3 = document.createElement('td')
//     var htd4 = document.createElement('td')
//     var htd5 = document.createElement('td')
//     var htd6 = document.createElement('td')
//     // var td7 = document.createElement('button')
//     // var dropdown = document.getElementById('medilist')
//     // todo div
    
//     var htbody = document.getElementById('htableBody')
//     var htrow = document.createElement('tr')

//     var htd2 = document.createElement('td')
//     var htd3 = document.createElement('td')
//     var htd4 = document.createElement('td')
//     var htd5 = document.createElement('td')
//     var htd6 = document.createElement('td')

//     htd2.innerHTML= individualDoc.data().opd;
//     htd3.innerHTML= individualDoc.data().ptname;
//     htd4.innerHTML= individualDoc.data().age;
//     htd5.innerHTML= individualDoc.data().dia;
//     htd6.innerHTML= individualDoc.data().treat;

//     htrow.appendChild(htd2)
//     htrow.appendChild(htd3)
//     htrow.appendChild(htd4)
//     htrow.appendChild(htd5)
//     htrow.appendChild(htd6)
//     // htrow.appendChild(htd7)
//     // td7.appendChild(link)
//     // trow.appendChild(td6)
//     // trow.appendChild(td6)
//     htbody.appendChild(htrow)
// }
