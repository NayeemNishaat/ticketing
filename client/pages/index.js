import buildClient from "../api/build-client";

function LandingPage({ currentUser }) {
  console.log(currentUser);
  return <div>Landing Page</div>;
}

LandingPage.getInitialProps = async (context) => {
  // Important: `getInitialProps` Executed in the server when we visit/refresh the page.
  // Important: `getInitialProps` Executed in the client when we have already mounted the page on the client and navigate to the page somehow without revisiting/refreshing the page.
  // Note: To check if user is logged in or not the request is required to made in this serverside component.
  // await axios.get("/api/users/currentuser"); // Important: This reques will run inside the nextjs client pod. And in that pod on 127.0.0.1:80/api/users/currentuser nothing is running. Hence error occured.
  // Important: For communication between pods in the same nameshapece the url will be -> http://auth-svc/api/users/currentuser
  // Important: For communication between pods in different nameshapeces the url will be -> http://nameOfTheService.namespace.svc.cluster.local/api/users/currentuser
  // Note: kubectl get namespace -> Get all namespaces
  // Note: kubectl get services -n ingress-nginx -> Get all services of ingress-nginx namespace.

  const { data } = await buildClient(context).get("/api/users/currentuser");
  return data;
};

export default LandingPage;
