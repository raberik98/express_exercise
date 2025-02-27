async function loadCoffee() {
    let coffees = await fetch("/api/v1/coffee").then(resp => resp.json())

    document.querySelector(".coffie-display").innerHTML = coffees.map(nextCoffee => 
        `<div class="card coffee" style="width: 18rem;" data-bs-theme="dark">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${nextCoffee.name}</h5>
            <p class="card-text">${nextCoffee.description}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Origin: ${nextCoffee.origin}</li>
            <li class="list-group-item">Coffeine: ${nextCoffee["caffeine_content_mg"]} mg</li>
            <li class="list-group-item">Size: ${nextCoffee.serving_size_ml} ml</li>
        </ul>
        <div class="card-body">
            <button class="btn btn-primary edit-btn">Edit</button>
            <button class="btn btn-danger delete-btn" data-id="${nextCoffee.id}">Delete</button>
        </div>
        </div>`).join("")
}

async function main() {
    await loadCoffee()

    /* const coffeeCards = document.querySelectorAll('.coffee')

    coffeeCards.forEach(coffee => {
        const deleteBtn = coffee.querySelector('.delete-btn')
        deleteBtn.addEventListener('click', function (e) {
            console.log('delete btn clicked');
            
        })
        
    }) */

    const coffeeContainer = document.querySelector('.coffie-display');

    coffeeContainer.addEventListener('click', async function(e) {
        if(e.target.classList.contains('delete-btn')) {
            const resp = await fetch(`/api/v1/coffee?id=${e.target.dataset.id}`, {
                method: 'DELETE'
            })

            if (resp.status == 200) {
                const responseData = await resp.json()
                alert(responseData.message)
                await loadCoffee()
            }
        }

    })
    

}
main()