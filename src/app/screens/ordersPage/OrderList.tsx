import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { serverApi } from "../../../lib/config";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { Order } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";

interface OrderListProps {
  orders: Order[];
  onCancel?: (orderId: string) => Promise<void>;
  onPayment?: (orderId: string) => Promise<void>;
  onVerify?: (orderId: string) => Promise<void>;
}

export default function OrderList({
  orders,
  onCancel,
  onPayment,
  onVerify,
}: OrderListProps) {
  const { authMember } = useGlobals();
  const memberOrders = orders.filter(
    (order) => order.memberId === authMember?._id,
  );

  if (!memberOrders.length) {
    return (
      <Box className="empty-state">
        <img src="/icons/noimage-list.svg" alt="No orders found." />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      {memberOrders.map((order) => (
        <Box key={order._id} className="order-main-box">
          <Box className="order-box-scroll">
            {order.orderItems.map((item) => {
              const product = order.productData.find(
                (product) => product._id === item.productId,
              );
              const image = product?.productImages[0];
              const itemTotal = item.itemPrice * item.itemQuantity;

              return (
                <Box key={item._id} className="orders-name-price">
                  {image ? (
                    <img
                      src={`${serverApi}/${image}`}
                      className="order-dish-img"
                      alt=""
                    />
                  ) : (
                    <span />
                  )}
                  <p className="title-dish">
                    {product?.productName ?? "Product unavailable"}
                  </p>
                  <Box className="price-box">
                    <p>${item.itemPrice}</p>
                    <img src="/icons/close.svg" alt="×" />
                    <p>{item.itemQuantity}</p>
                    <img src="/icons/pause.svg" alt="=" />
                    <p>${itemTotal}</p>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box className="order-footer">
            <Box className="order-summary">
              <div className="order-summary-row">
                <span>Product price</span>
                <span>${order.orderTotal - order.orderDelivery}</span>
              </div>
              <img src="/icons/plus.svg" alt="+" />
              <div className="order-summary-row">
                <span>{onCancel ? "Delivery cost" : "delivery cost"}</span>
                <span>${order.orderDelivery}</span>
              </div>
              <img src="/icons/pause.svg" alt="=" />
              <div className="order-summary-row">
                <span>Total</span>
                <span>${order.orderTotal}</span>
              </div>
            </Box>

            <Box className="order-actions">
              {order.orderStatus !== OrderStatus.PAUSE && (
                <span className="order-date">
                  {moment().format("YY-MM-DD HH:mm")}
                </span>
              )}
              {onCancel && (
                <Button
                  className="cancel-button"
                  variant="contained"
                  onClick={() => onCancel(order._id)}
                >
                  Cancel
                </Button>
              )}
              {onPayment && (
                <Button
                  className="pay-button"
                  variant="contained"
                  onClick={() => onPayment(order._id)}
                >
                  Payment
                </Button>
              )}
              {onVerify && (
                <Button
                  className="verify-button"
                  variant="contained"
                  onClick={() => onVerify(order._id)}
                >
                  Verify to Fulfil
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
