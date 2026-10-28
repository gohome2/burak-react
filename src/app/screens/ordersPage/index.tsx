import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

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
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Order status"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} id="order-tab-1" aria-controls="order-panel-1" />
                  <Tab label="PROCESS ORDERS" value={"2"} id="order-tab-2" aria-controls="order-panel-2" />
                  <Tab label="FINISHED ORDERS" value={"3"} id="order-tab-3" aria-controls="order-panel-3" />
                </Tabs>
              </Box>
            </Box>

            <Stack className={"order-main-content"}>
              <PausedOrders />
              <ProcessOrders />
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
              <span className={"order-user-name"}>Martin</span>
              <span className={"order-user-prof"}>User</span>
            </Box>

            <Box className={"liner"} />

            <Box className={"order-user-address"}>
              <LocationOnIcon aria-hidden="true" />
              <span>South Korea, Busan</span>
            </Box>
            <p className="order-status-note">Demo profile</p>
          </Box>

          <Box className={"order-payment-box"}>
            <h2 className="payment-title">Payment details</h2>
            <div className="payment-methods" aria-label="Payment methods">
              <img src="/icons/visa-card.svg" alt="Visa" />
              <img src="/icons/master-card.svg" alt="Mastercard" />
              <img src="/icons/paypal-card.svg" alt="PayPal" />
              <img src="/icons/western-card.svg" alt="Western Union" />
            </div>

            <dl className="payment-fields">
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
            <p className="order-status-note">
              Demo only. No payment information is collected.
            </p>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
