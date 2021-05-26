const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");

const todoContainer = document.getElementById('pt');

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
        location = "login.html";
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

    // button
    let trash = document.createElement("button");

    let i = document.createElement("i");
    i.className = "fas fa-trash";

    // appending
    trash.appendChild(i);

    parentDiv.appendChild(Name);
    parentDiv.appendChild(trash);

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

    // trash clicking event
    trash.addEventListener('click', e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection(user.uid).doc(id).delete();
            }
        alert('Succesfully deleted')
//         window.location.reload()
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
form.addEventListener('submit', e => {
    e.preventDefault();
    const opd = form['opd'].value;
    const ptname = form['ptname'].value;
    const age = form['age'].value;
    const dia = form['dia'].value;
    const treat = form['treat'].value;
    const link = form['link'].value;
    // const todos = form['opd'].value;
    // console.log(todos);
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
