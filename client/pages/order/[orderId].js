import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    if (timeLeft < 0) clearInterval(timerId);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) return <h1>Order Expired</h1>;

  return (
    <>
      <h1>{order.ticket.title}</h1>
      <div>Time left to pay: {timeLeft}s!</div>
      <StripeCheckout
        token={({ id }) => console.log(id)}
        stripeKey="pk_test_51KoMC0CUGtQvOzQdZv6lb3Lgbf6scxHV1uMyvHfOW47PHpSNdbzFcWyiGXdU0H1ROZx26dhwECinUtGiMpSW6mvR00p5vVUI6o"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
    </>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/order/${orderId}`);

  return { order: data };
};

export default OrderShow;
