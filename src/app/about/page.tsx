export default function AboutPage() {
    return <div className="container !py-6">
        <h1 className="main-title">About</h1>
        <p>Hello and welcome to my site.</p>
        <p>As you might have gathered already this site is for programming showcase purposes only and no product is being sold or offered here, although the miniatures are in fact painted by me.</p>
        <p><br />I made this site having some react experience already, using Nextjs for the first time. Next was used both for the front-end and back-end with a mocked database.</p>
        <p>The project is made in TypeScript using Next version 15 and react 19.
            <br />TailwindCSS version 4 was used as a CSS framework.
            <br />Global state is managed with React Redux 9 with Redux Toolkit 2.
            <br />The backend is served directly by the app itself thanks to Next. The backend APIs are RESTful and can be accessed from the api directory per Next guidelines.
            <br />There is no real database, all database fetching is mocked with a timeout delay.<br />Swiper is used for the homepage slider as well as the product carousels.
            <br />DineroJS is used to manage prices, but the dinero type has been customized to be serializable as per React guidelines.<br />Redux Persist is used to keep login and cart states.
            <br />Google Material UI has been used not to supply react components, but just to supply the icons used around the site.<br />The Roboto font is supplied by Google Fonts and is directly imported client side rather than saved on server.</p>
        <p> <br />The code is available on <a className="text-tertiary hover:text-contrast-text" href="" target="_blank" rel="noopener noreferrer">GitHub</a> if you want to take a look.</p>
    </div>
}