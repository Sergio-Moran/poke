import { render, screen, waitFor } from "@testing-library/react";
import Poke from "..pages/poke";

describe("poke", () => {
  it("renders pokemones", async () => {
    const mockResults = [
      { name: "chanchito", url: "http://www.dominio.com/pokemones/1" },
    ];
    global.fetch = jest.fn().monckImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          json: () =>
            Promise.resolve({
              results: mockResults,
            }),
        });
      });
    });
    render(<Poke />);
    const loading = screen.getByText("Cargando...");
    expert(loading).toBeInTheDocument();
    await waitFor(()=>screen.getByText('Mi App de Pokemones'));
    const element =screen.getByTestId(1)
    const anchor=element.children[0];
    expect(anchor).toHaveAttribute('href','/pokemones/1')
    expect(anchor).toHaveTextContent('chanchito')
  });
});
