async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    books.forEach(renderBook)
}

function renderBook(book) {
    let bookContainer = document.querySelector('.book-container')
    bookContainer.innerHTML += `
        <div class="col-sm-3">
            <div class="card" style="width: 100%;">
                ${book.imageURL ? `
                    <img class="card-img-top" src="${book.imageURL}" />
                `
                : ``}
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Available: ${book.quantity}</h6>
                    <p class="card-text">${book.description}</p>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Enter text" id="quantityInput-${book.id}">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${book.id})">Update Quantity</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

async function updateQuantity(bookId) {
    const quantityInput = document.getElementById(`quantityInput-${bookId}`);
    const newQuantity = quantityInput.value;

   
    const response = await fetch(`http://localhost:3001/updateQuantity/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: newQuantity,
        }),
    });

    if (response.ok) {
  
        const bookSubtitle = document.querySelector(`.card-subtitle[data-book-id="${bookId}"]`);
        bookSubtitle.textContent = `Available: ${newQuantity}`;
    } else {
        console.error('Failed to update quantity');
    }
}

main()