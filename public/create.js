window.addEventListener("submit", async (e) => {
    e.preventDefault()

    if(e.target.classList.contains("add-coffee-form")){
        const newCoffee = {
            name: e.target.name.value,
            origin: e.target.origin.value,
            caffeine_content_mg: parseInt(e.target.caffeine_content_mg.value),
            description: e.target.description.value,
            serving_size_ml: parseInt(e.target.serving_size_ml.value)
        } 

        const resp = await fetch("/api/v1/coffee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })

        if (resp.status == 200) {
            const responseData = await resp.json() 
            alert(responseData.message)
        }
        
    }
})