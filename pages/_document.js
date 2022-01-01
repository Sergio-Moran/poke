/**
 * Lo que sucede aqui es que se necesita hacer esta logica para que los styles components nos funcionen sin errores
 * Instalar:
 * 1. npm i -S Styled-components
 * 2. npm i -D babel-pluggin-styled
 * 3. Creamos la el archivo de .babelrc dentro de eso debemos de colocar: 
 *                                                                      {
                                                                        "presets":["next/babel"],
                                                                        "plugins":["styled-components"]
                                                                        }
 * 4. Debemos de crear un archivo dentro de la carpeta de pages que le colocaremos el nombre de _document.js
 * 5. en este debemos de importar los sigientes componentes y el hook.
 * El hook se encarga de renderizar la pagina tanto para el servidro como para el cliente.
 * Del lado del servidor se encarga el sheet, el renderPage es lo que renderiza el contexto de la pagina,
 * luego lo que podemos hacer es mandar a llamar a enhanceApp el cual es tecnicamente un compnente
 * el cual va a ir a buscar todos los estilos los cuales los dejara dentro del collectStyles por medio de las 
 * copias de las props esto se guarda dentro de sheet y seguidamente le pasamos la funcion asicrona que optien las propiedades
 * iniciales y a su vez nosotros le podemos agregar mas stilos, eso es lo que sucede en el return de la aplicacion.
 * 
 * NOTA: Por si se me olvida como es que va estructurado esto lo que puedo hacer es copiar esto o irme a la pagina de styles components
 * a la documentacion al apartado de Server Side Rendering luego se busca el apartado de Next.js y ahi en el primer parafo esta el ejemplo que se 
 * utiliza para realizar todo esto, solo es del ir a gitHub'pages'_documents y copiar, lo cual es lo mismo que ya esta escrito y es mas que 
 * nada para ahorrar tiempo.
 * 
 * NOTA 2: si bien lo que se hace en este archivos es posible de solo copiar y pegar siempre es necesario que se realicen los pasos del 1 al 4 
 * para poder contar con todo lo necesario.
 */

import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
