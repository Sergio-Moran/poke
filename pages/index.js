import Link from "next/link";
/**
 * NOTA: es importante que se le coloque el / siempre a las referecias
 * como la que se usa con Link ya que si no la usamos puede que nos
 * genere un error en la consola.s
 */
const Pokemon = ({ pokemon }) => {
  const id = pokemon.url
    .split("/")
    .filter((x) => x)
    .pop();
  return (
    <li>
      <Link href={`/pokemones/${id}`}>{pokemon.name.toUpperCase()}</Link>
    </li>
  );
};

export default function Home({ pokemones }) {
  console.log(pokemones);
  return (
    <div>
      <p>Mi App de Pokemones</p>
      <ul>
        {pokemones.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const response = await fetch("http://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await response.json();

  return {
    props: { pokemones: data.results },
  };
};
