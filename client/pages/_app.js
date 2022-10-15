import "bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/build-client";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <h1>Header</h1>
      <Component {...pageProps} />
    </>
  );
};

App.getInitialProps = async (appContext) => {
  // console.log("sjhfgvhb"); // Important: This will be executed for all the pages. A good place to call the auth service.
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  console.log("App");
  return data;
};

export default App;
