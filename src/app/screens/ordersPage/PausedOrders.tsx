import TabPanel from "@mui/lab/TabPanel";
import OrderList from "./OrderList";

export default function PausedOrders() {
  return (
    <TabPanel
      value="1"
      id="order-panel-1"
      aria-labelledby="order-tab-1"
      className="order-panel"
    >
      <OrderList status="paused" />
    </TabPanel>
  );
}
