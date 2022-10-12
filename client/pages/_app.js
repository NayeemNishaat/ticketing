import "bootstrap/dist/css/bootstrap.min.css";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// App.getInitialProps = async () => {
//   console.log("sjhfgvhb"); // Important: This will be executed for all the pages. A good place to call the auth service.
//   return {};
// };

export default App;
