let data = {};

async function fetchingDataRickAndMorty() {
    try {
        const url = "https://rickandmortyapi.com/api/character";
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error en la petición");
        }

        data = await response.json();
        return data;
    } catch (error) {
        console.error("Hubo un error" + error);
        return Promise.reject(new Error("Error en la petición"));
    }
}

async function generatingCards(data) {
    const container = document.getElementById("container");

    data.results.forEach((characterData) => {
        container.insertAdjacentHTML("beforeend",
            `
                <div class="card-container">
                        <img src="${characterData.image}" alt="personaje">
                        <h3 class="name" id="name">Name: ${characterData.name}</h3>
                        <p class="info" id="status">Status: ${characterData.status} </p>
                        <p class="info" id="specie">Species: ${characterData.species}</p>
                        <p class="info" id="gender">Gender: ${characterData.gender}</p>
                        <p class="info" id="origin">Origin: ${characterData.origin.name} </p>
                </div>
                `
        );
    });
}

async function execute(){
    try {
        const data = await fetchingDataRickAndMorty();
        generatingCards(data);
    } catch (error) {
        console.error("Hubo un " + error);
    }
}

execute();