const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

**********************
// use this google meet now.
https://meet.google.com/oxw-vjut-yhq
// or know me on whats-app
+8801790092627
// or you can email me.
mdabutahersaikat@gmail.com
**********************

// create element and render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    cross.textContent = 'x';

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li)


    // Deleting data
    cross.addEventListener('click', (e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}

// advance query
// where('city','==','manchester')


// get data from firebase.
// db.collection('cafes').get().then((snapshot)=>{
//     // console.log(snapshot.docs)
//     snapshot.docs.forEach(doc=> {
//         // console.log(doc.data());
//         renderCafe(doc);
//     })
// })


// add data form frontEnd.
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    db.collection('cafes').add({
        name : form.name.value,
        city : form.city.value
    })

    form.name.value = '';
    form.city.value = '';
})



// Real time listener
db.collection('cafes').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();

    changes.forEach(change => {
        // console.log(change.type);
        if(change.type == "added"){
            renderCafe(change.doc)
        }else if(change.type == 'removed'){
            console.log(change.doc)
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            console.log(li)
            cafeList.removeChild(li);
        }
    })
});


// update a document
// db.collection('cafes').doc('doc id').update({
//     city : "change city",
//     name : "change The name"
// })

// this one is the update demo. can u see
// db.collection('cafes').doc('udkFJoEA4MdmCFuSk4Lz').update({
//     city : "Dellhi",
//     name : "the coffee way"
// })

// "set" method is also similler. but if you don't pass any value, that value will be empty.soon
