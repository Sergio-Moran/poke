import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

/**
 * Para poder incluir imagenes que no se encuentren dentro de la carpeta
 * de public como normalmente se haria tendremos que hacer lo siguiente:
 * Lo que se hace es ir a next.confing.js
 *
 * Para indicar que alguno de los elementos no esta dentro de la lista
 * que tenemos de getStaticPath entonces le mandamos la accionde
 * cargando ya que este no esta utilizando la funcion de generarse antes
 * de ser llamado por el usuario.
 * Esto funciona ya que le estamos pasando los fallback como verdaderos.
 */
 const Content = styled.div`
 padding: 20px 25px;
 text-align: center;
`;

const Hache = styled.h1`
font: oblique bold 120% cursive;
color: #00FFF5;
font-size: 30px;
`;

const HacheM = styled.h3`
font: oblique bold 120% cursive;
color: #ffff;
cursor: pointer;
`;

const Pokemon = ({ data }) => {
  const router = useRouter();
  console.log(data);

  if (router.isFallback) {
    return <p>Cargando...</p>;
  }
  return (
    <Content>
      <Hache>
        {data.name.toUpperCase()} numero #{data.id}
      </Hache>
      <Image src={data.sprites.front_default} width={400} height={400} />
      <Link href="/">
        <HacheM>
          ⬅️Volver al Inicio.
        </HacheM>
      </Link>
    </Content>
  );
};

export default Pokemon;
/**
 * Es para que la pagina se rederice tando del lado del servidor como del
 * cliente.
 * Esto es algo que se realiza para poder hacer una renderizacion antes
 * de que el usuario siquiera alla seleccionado la opcion para ver las
 * cosas que este en el.
 */
/*export const getServerSideProps = async ({ params }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );
  const data = await response.json();

  return { props: { data } };
};*/

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );
  const data = await response.json();

  return { props: { data } };
};
/**
 * Lo que hace getStaticPaths es que le indica que rutas dinamicas debe
 * de renderizar la aplicacion
 * La propiedad de fallback se encarga de renderizar solo las rutas qe estan
 * en la constante path, si cambiamos a true intentara de rederizar todas las
 * rutas.
 */
export const getStaticPaths = async () => {
  const paths = [{ params: { id: "1" } }, { params: { id: "2" } }];
  return {
    paths,
    fallback: true,
  };
};
