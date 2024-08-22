// book class



class Book{
    constructor(title,author,ISBN){
        this.title=title
        this.author=author
        this.ISBN=ISBN
        
        //available book when the first create
        this.isAvailable=true
    }

    //the wethod will toggle if isAvailiblity is true this method make it false
    toggleAvailability(){
        this.isAvailable =! this.isAvailable
    }
}



// User Class

class User{
    constructor(name,userID){
        this.name=name;
        this.userID=userID;
        this.booksCheckedOut=[];
    }


    // here the metthod to allow user to checkedOutBook

    checkOutBook(book){
        if(book.isAvailable){
            //if book is available add it into user
            this.booksCheckedOut.push(book)
            //now toggle the book isavailable to false
            book.toggleAvailability();
            alert(`${this.name} has chackedOut the ${book.title}`)
        }

        else{
            alert(`${book.title} has checked out`)
        }
    }


    // method for returning the book
    returnBook(book){
        //find the index of book in the users bookscheckedOut array
        const bookIndex = this.booksCheckedOut.indexOf(book)
        if(bookIndex!==-1){
            //if the book is found then remove it from the array
           this.booksCheckedOut.splice(bookIndex, 1)
           book.toggleAvailability();
           alert(`${this.name} has returned the "${book.title}"`)
        }

        else{
            alert(`${this.name} does not have "${book.title} checked out`)
        }
    }

}


// connecting the classes to UI

//Library and User Storage
const library = [];
const users = [];


const addBookBtn = document.getElementById("addBookBtn")
const registerUserBtn = document.getElementById("registerUserBtn")
const checkOutBtn = document.getElementById("checkOutBtn")
const returnBookBtn = document.getElementById("returnBtn")

const libraryInventory = document.getElementById("libraryInventory")
const registeredUsers = document.getElementById("registerdUser")


// function displayBooks(){
//     libraryInventory.innerHTML='<ul>'+library.map(book=>
//         `<li>${book.title} By ${book.author} (ISBN: ${book.ISBN}) ${book.isAvailable ? 'available' : 'checked out'} </li>`
//     ).join('') + '</ul>'
// }

function displayBooks(){
    libraryInventory.innerHTML=`
    <table border="1">
    <tr>
    <th>Book Title</th>
    <th>Book Author</th>
    <th>Book ISBN</th>
    <th>Book Availiblity</th>
    </tr>

        ${
        library.map(book=>`
            <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.ISBN}</td>
            <td>${book.isAvailable}</td>
            </tr>
        `)
        }

    </table>
    `
    
}


// function displayUsers(){
//     registeredUsers.innerHTML='<ul>' + users.map(user=>
//         `<li>${user.name} (ID: ${user.userID}) - Books Checked Out: ${user.booksCheckedOut.length} </li>`
//     ).join('') + '</ul>'
// }


function displayUsers(){
    registeredUsers.innerHTML=`
    <table border="1">
    <tr>
    <th>User Name</th>
    <th>User UserID</th>
    <th>Books CheckedOut</th>
    </tr>

    ${
    users.map(user=>`
       <tr>
       <td>${user.name}</td>
       <td>${user.userID}</td>
       <td>${user.booksCheckedOut.length}</td>
       </tr>
    `)
    }

    </table>
    `

}



addBookBtn.addEventListener('click',()=>{
    const title = document.getElementById('bookTitle').value
    const author = document.getElementById('bookAuthor').value
    const ISBN = document.getElementById('bookISBN').value

    const existingBook = library.some(lib=>lib.ISBN === ISBN)

    if(existingBook){
        alert('already a book available with same ISBN')
    }

    else if(title && author && ISBN){
        const newBook = new Book(title,author,ISBN)
        library.push(newBook)
        displayBooks();
        alert('book add succesfully')

        document.getElementById('bookTitle').value=''
        document.getElementById('bookAuthor').value=''
        document.getElementById('bookISBN').value=''


    }
    else{
        alert('all field required')
    }

});


registerUserBtn.addEventListener('click',()=>{
    const name = document.getElementById('userName').value
    const userID = document.getElementById('userID').value

    const existingUser = users.some(user=>user.userID === userID)

    if(existingUser){
        alert('user already exist with same id')
    }

     else if(name && userID){
        const newUser = new User(name,userID)
        users.push(newUser)
        displayUsers();
        alert('user added succefully');

        document.getElementById('userName').value=''
        document.getElementById('userID').value=''
     }
     else{
        alert('all field required')
    }
})


checkOutBtn.addEventListener('click',()=>{
    const userID = document.getElementById('CheckOutUserID').value
    const ISBN = document.getElementById('CheckOutISBN').value

    const user = users.find(user=>user.userID==userID)
    const book = library.find(book=>book.ISBN==ISBN)

    if(user,book){
       user.checkOutBook(book)
       displayBooks();
       displayUsers();
    }
    else{
        alert('book not found')
    }
})


returnBookBtn.addEventListener('click',()=>{
    const userID = document.getElementById('CheckOutUserID').value
    const ISBN = document.getElementById('CheckOutISBN').value

    const user = users.find(user=>user.userID===userID)
    const book = library.find(book=>book.ISBN===ISBN)

    if(user,book){
        user.returnBook(book)
        displayBooks();
        displayUsers();
    }

    else{
        alert("user or book not found")
    }
});


displayBooks();
displayUsers();
