

async function main() {
    const data = await fetch("/api/v1/coffee").then(resp => resp.json())

    document.querySelector(".coffie-display").innerHTML = data.map(nextCoffee => 
    `<div class="card" style="width: 18rem;" data-bs-theme="dark">
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
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
    </div>`).join("")

}
main()