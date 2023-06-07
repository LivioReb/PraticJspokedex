const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json()
        return data;   
    }
}

let searchPokemon = 1;

// funcao que vai renderizar os dados da pegos do pokemon na fetchPokemon

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon);
   
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        
        input.value = '';//para limpar o input
        searchPokemon = data.id
    }else{ // se nao tiver dados na tela faz o else
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :c';
        pokemonNumber.innerHTML = '';

    }

    
}

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase()) //(input.value.toLowerCase())pra transformar todas as letras em minuscula para nao dar erro no codigo.
   
});


buttonPrev.addEventListener('click', ()=> {
    if (searchPokemon>1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});


buttonNext.addEventListener('click', ()=> {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
   
});

renderPokemon(searchPokemon)