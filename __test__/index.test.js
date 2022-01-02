import { render, screen } from "@testing-library/react";
import Pokemones, { gtetStaticProps } from "../pages/index";
import { getStaticProps } from "../pages/pokemones/[id]";

describe("Component", () => {
  it("renderiza", () => {
    /*const { getByTestId } = render(
      <Pokemones
        pokemones={[{ name: "Chancito Feliz", url: "/pokemon/detalle/1" }]}
      />
    );*/

    render(
      <Pokemones
        pokemones={[{ name: "Chancito Feliz", url: "/pokemon/detalle/1" }]}
      />
    );

    //const paragraph=screen.getByText('Mi App de Pokemones')
    //const paragraph = screen.getByTestId("titulo");
    /**
     * NOTA: Lo que sucede aqui es que si en el render no lo pasamos como su funcion/ constante
     * entonces usamos el screen que nos devuelve todo el html
     *
     * const paragraph = screen.getByTestId("titulo");
     * */
    //const paragraph = getByTestId("titulo");
    //console.log(paragraph.innerHTML);
    //expect(paragraph).toBeInTheDocument();

    const chanchito = screen.getByText("Chancito Feliz");
    expect(chanchito).toBeInTheDocument();
    //console.log(chanchito.getAttribute('href'))
    const url = chanchito.getAttribute("href");
    expect(url).toEqual("/pokemon/1");
  });
});

/**
 * la funcion fn nos permite definir como es que se va a comportar.
 */
describe("getStaticProps", () => {
  it("return pokemones", async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              results: "lista de pokemones",
            }),
        });
      });
    });
    const { props } = await getStaticProps();
    expect(props.pokemones).toBe("lista de pokemones");
  });
});
