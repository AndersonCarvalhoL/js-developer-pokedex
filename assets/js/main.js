const apiUnsplash = "https://images.unsplash.com/photo-1621568670868-24a7dfc590e9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8cG9rZW1vbnx8fHx8fDE3MDY5OTU2NTM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600";

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151;
const limit = 8;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">

                </div>
                <div class="details-btn">Mais Detalhes</div>

                <div class="hidden-details">
                    <span class="status">
                        <span class="hp">Vida: ${pokemon.hp} <i class="fa-solid fa-heart"></i></span>
                        <span class="atk">Ataque: ${pokemon.atk} <i class="fa-solid fa-fire"></i></span>
                        <span class="def">Defesa: ${pokemon.def} <i class="fa-solid fa-shield"></i></span>   
                    </span>
                </div>
        </li>
    `;
} 



function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

document.getElementById('pokemonList').addEventListener('click', function(event) {
    if (event.target.classList.contains('details-btn')) {
        const detailsContainer = event.target.nextElementSibling;

        if (detailsContainer.style.display === 'none' || detailsContainer.style.display === '') {
            detailsContainer.style.display = 'block';
            event.target.innerText = 'Menos Detalhes';
        } else {
            detailsContainer.style.display = 'none';
            event.target.innerText = 'Mais Detalhes';
        }
    }
});

function loadBackgroundImage() {
    document.body.style.backgroundImage = `url("${apiUnsplash}")`;
}

loadBackgroundImage();