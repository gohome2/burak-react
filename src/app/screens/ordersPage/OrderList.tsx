import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";

type OrderStatus = "paused" | "process" | "finished";

interface DemoItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

/* Sample data only: replace this with real order data when an API is available. */
const demoItems: DemoItem[] = [
  { name: "Lavash", image: "/img/lavash.webp", price: 10, quantity: 2 },
  { name: "Kebab", image: "/img/kebab.webp", price: 10, quantity: 2 },
  { name: "Cutlet", image: "/img/cutlet.webp", price: 10, quantity: 2 },
];

interface OrderListProps {
  status: OrderStatus;
}

export default function OrderList({ status }: OrderListProps) {
  const [message, setMessage] = useState("");
  const showDemoMessage = (action: string) => {
    setMessage(`${action} is a demo. The order service is not connected yet.`);
  };
  const productPrice = demoItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryCost = 5;
  const total = productPrice + deliveryCost;

  return (
    <Stack>
      {demoItems.length > 0 ? (
        <Box className="order-main-box">
          <Box className="order-box-scroll">
            {demoItems.map((item) => (
              <Box
                key={item.name}
                className="orders-name-price"
                role="group"
                aria-label={`${item.name}: $${item.price} each, quantity ${item.quantity}, total $${item.price * item.quantity}`}
              >
                <img
                  src={item.image}
                  className="order-dish-img"
                  alt={item.name}
                />
                <p className="title-dish">{item.name}</p>
                <Box className="price-box" aria-hidden="true">
                  <p>${item.price}</p>
                  <img src="/icons/close.svg" alt="" />
                  <p>{item.quantity}</p>
                  <img src="/icons/pause.svg" alt="" />
                  <p>${item.price * item.quantity}</p>
                </Box>
              </Box>
            ))}
          </Box>

          <Box className="order-summary">
            <div className="order-summary-row">
              <span>Product price</span>
              <span>${productPrice}</span>
            </div>
            <div className="order-summary-row">
              <span>Delivery cost</span>
              <span>${deliveryCost}</span>
            </div>
            <div className="order-summary-row">
              <strong>Total</strong>
              <strong>${total}</strong>
            </div>
          </Box>

          {status === "process" && (
            <p className="order-status-note">
              {moment().format("YY-MM-DD HH:mm")}
            </p>
          )}

          {status !== "finished" && (
            <>
              <Box className="order-actions">
                {status === "paused" ? (
                  <>
                    <Button
                      className="cancel-button"
                      variant="contained"
                      color="secondary"
                      onClick={() => showDemoMessage("Cancel")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="pay-button"
                      variant="contained"
                      onClick={() => showDemoMessage("Payment")}
                    >
                      Payment
                    </Button>
                  </>
                ) : (
                  <Button
                    className="verify-button"
                    variant="contained"
                    onClick={() => showDemoMessage("Verify")}
                  >
                    Verify to Fulfil
                  </Button>
                )}
              </Box>
              <p className="order-status-note" aria-live="polite">
                {message || ""}
              </p>
            </>
          )}
        </Box>
      ) : (
        <Box className="empty-state">
          <img src="/icons/noimage-list.svg" alt="" />
          <p>No orders found.</p>
        </Box>
      )}
    </Stack>
  );
}
