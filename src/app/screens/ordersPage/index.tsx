import { useEffect, useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";

import { useDispatch } from "react-redux";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { OrderInquiry } from "../../../lib/types/order";
import "../../../css/orders.css";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { authMember, orderBuilder } = useGlobals();
  const [value, setValue] = useState("1");
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    if (!authMember) {
      dispatch(setPausedOrders([]));
      dispatch(setProcessOrders([]));
      dispatch(setFinishedOrders([]));
      return;
    }

    let active = true;
    const order = new OrderService();
    const orderLists = [
      { status: OrderStatus.PAUSE, setOrders: setPausedOrders },
      { status: OrderStatus.PROCESS, setOrders: setProcessOrders },
      { status: OrderStatus.FINISH, setOrders: setFinishedOrders },
    ];

    orderLists.forEach(({ status, setOrders }) => {
      order
        .getMyOrders({ ...orderInquiry, orderStatus: status })
        .then((data) => {
          if (active) dispatch(setOrders(data));
        })
        .catch((err) => console.log(err));
    });

    return () => {
      active = false;
    };
  }, [authMember, dispatch, orderInquiry, orderBuilder]);

  /** HANDLERS **/

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="Order status"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </TabList>
              </Box>
            </Box>

            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={"/icons/default-user.svg"}
                  className={"order-user-avatar"}
                  alt=""
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={"/icons/user-badge.svg"}
                    className={"order-user-prof-img"}
                    alt=""
                  />
                </div>
              </div>
              <span className={"order-user-name"}>{authMember?.memberNick}</span>
              <span className={"order-user-prof"}>User</span>
            </Box>

            <Box className={"liner"} />

            <Box className={"order-user-address"}>
              <LocationOnIcon aria-hidden="true" />
              <span>{authMember?.memberAddress || "Do not exist"}</span>
            </Box>
          </Box>

          <Box className={"order-payment-box"}>
            <dl className="payment-fields" aria-label="Sample payment details">
              <div className="payment-field payment-field--wide">
                <dt>Card number</dt>
                <dd className="payment-value">•••• •••• •••• ••••</dd>
              </div>
              <div className="payment-field">
                <dt>Expiry</dt>
                <dd className="payment-value">MM/YY</dd>
              </div>
              <div className="payment-field">
                <dt>CVV</dt>
                <dd className="payment-value">•••</dd>
              </div>
              <div className="payment-field payment-field--wide">
                <dt>Cardholder</dt>
                <dd className="payment-value">Demo user</dd>
              </div>
            </dl>
            <div className="payment-methods" aria-label="Payment methods">
              <img src="/icons/western-card.svg" alt="Western Union" />
              <img src="/icons/master-card.svg" alt="Mastercard" />
              <img src="/icons/paypal-card.svg" alt="PayPal" />
              <img src="/icons/visa-card.svg" alt="Visa" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
