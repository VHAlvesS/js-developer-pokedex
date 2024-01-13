const pokemonDexDetails = function (pokemon) {
    return `
    <div class="modal-container">
    <div class="modal ${pokemon.types[0].type.name}">
        <div class="pokemonShowcase">
            <div class="modalTop">
                <h2 id=>${pokemon.name}</h2>
                <span class="closeModal" style="color: white;">❌</span>
            </div>
            ${pokemon.types.map((type) => `<span class="type ${type.type.name}">${type.type.name}</span>`).join('')}
            <span class="pokemonNumber">#${pokemon.id}</span>
            <img src="${pokemon.sprites.front_default}" alt="" class="pokemonImg">
        </div>
        <div class="pokemonDescription">
            <div class="stats">
                <h3>Stats Base</h3>
                <p>HP</p>
                <span class="statHp">${pokemon.stats[0].base_stat}</span>
                <p>Attack</p>
                <span class="statAttack">${pokemon.stats[1].base_stat}</span>
                <p>Defense</p>
                <span class="statDefense">${pokemon.stats[2].base_stat}</span>
                <p>Special-attack</p>
                <span class="statSpecial-attack">${pokemon.stats[3].base_stat}</span>
                <p>Special-defense</p>
                <span class="statSpecial-defense">${pokemon.stats[4].base_stat}</span>
                <p>Speed</p>
                <span class="statSpeed">${pokemon.stats[5].base_stat}</span>
            </div>
            <div class="locations">
                <h3>Abilities</h3>
                ${pokemon.abilities.map((AbilityElement) => `<p>${AbilityElement.ability.name}</p>`).join('')}
            </div>
        </div>
    </div>
</div>
    `
}

document.querySelector('#pokemonList').addEventListener("click", function (event) {
    let alvoClique = event.target;

    while (alvoClique !== document.querySelector('#pokemonList')) {
        if (alvoClique.classList.contains("pokemon")) {
            let numberString = alvoClique.querySelector('.number').textContent;
            numberString = numberString.replace(/#/g, '');
            const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${numberString}`;

            const pokemonData = fetch(urlPokemon)
                .then(response => response.json())
                .then(data => {
                    // Faça algo com os dados do Pokémon
                    console.log(data);
                    console.log(data.types);
                    // O problema está aqui
                    // oldHtml.innerHTML += pokemonDexDetails(data);
                    
                    const pokemonDex = document.createElement("div");
                    pokemonDex.id = 'pokeDex';
                    pokemonDex.innerHTML = pokemonDexDetails(data);
                    const oldHtml = document.querySelector('.content');
                    oldHtml.appendChild(pokemonDex);

                    console.log(data.types[0]);
                    
                    if(document.querySelector('.modal-container')){
                        const modalC = document.querySelector('.modal-container');
                        const closeModal = document.querySelector('.closeModal');
    
                        modalC.addEventListener('click', function (e) {
                            if (e.target === modalC) {
                                // modalC.classList.toggle('hidden');
                                // Apagar o conteudo do pokedex
                                const elementRemove = document.querySelector('#pokeDex');
                                elementRemoveParent = elementRemove.parentNode;
                                elementRemoveParent.removeChild(document.querySelector('#pokeDex'));
                            }
                        })
    
                        closeModal.addEventListener('click', function (e) {
                            // modalC.classList.toggle('hidden');
                            // Apagar o conteudo do pokedex
                            const elementRemove = document.querySelector('#pokeDex');
                            elementRemoveParent = elementRemove.parentNode;
                            elementRemoveParent.removeChild(document.querySelector('#pokeDex'));
                        })
                    }
                })
            return;
        }
        alvoClique = alvoClique.parentNode;
    }

});
