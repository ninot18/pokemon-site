import { For, Show, createSignal, type Component } from "solid-js";
import type { FavoritePokemon } from "src/interfaces/favorite-pokemon";

interface Props {
    pokemon: FavoritePokemon;
}

export const FavoritePokemonCard: Component<Props> = ({pokemon}) => {

    const [ isVisible, setVisible ] = createSignal(true);

    const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
  


    const deleteFavorite = () => {
        const favorites = JSON.parse(
            localStorage.getItem('favorites') ?? '[]'
        )as FavoritePokemon[];

        const newFavorites = favorites.filter(p => p.id !== pokemon.id);

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setVisible(false);
    };
    
    return (
        <Show when={isVisible()}>

        
            <div
                class="flex flex-col justify-center items-center"
            >
                <a href={`/pokemons/${pokemon.name}`}>
                    <img
                        src={imageSrc}
                        alt={pokemon.name}
                        width="96"
                        height="96"
                        style={`view-transition-name: ${pokemon.name}-image`}
                    />
                    <p class="capitalize">#{pokemon.id} {pokemon.name}</p>
                </a>
                <button
                    onClick={deleteFavorite}
                    class="text-red-400"
                >
                    Borrar
                </button>
            </div>

        </Show>
    ); 

};