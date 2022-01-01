import Link from "next/link";
import styled from "styled-components";
/**
 * NOTA: es importante que se le coloque el / siempre a las referecias
 * como la que se usa con Link ya que si no la usamos puede que nos
 * genere un error en la consola.s
 */

 const Content = styled.div`
 padding: 20px 25px;
 text-align: center;
`;

const Tittle = styled.h2`
font: oblique bold 120% cursive;
color: #00FFF5;
font-size: 30px;
`;

const SubTittle = styled.h3`
font: oblique bold 120% cursive;
color: #00ADB5;
cursor: pointer;
`;

const Pokemon = ({ pokemon }) => {
  const id = pokemon.url
    .split("/")
    .filter((x) => x)
    .pop();
  return (
    <SubTittle>
      {id}_. <Link href={`/pokemones/${id}`}>{pokemon.name.toUpperCase()}</Link>
    </SubTittle>
  );
};

export default function Home({ pokemones }) {
  console.log(pokemones);
  return (
    <Content>
      <Tittle>Mi App de Pokemones</Tittle>
      <ul>
        {pokemones.map((pokemon) => (
          <Pokemon pokemon={pokemon} key={pokemon.name} />
        ))}
      </ul>
    </Content>
  );
}

export const getStaticProps = async () => {
  const response = await fetch("http://pokeapi.co/api/v2/pokemon?limit=156");
  const data = await response.json();

  return {
    props: { pokemones: data.results },
  };
};
