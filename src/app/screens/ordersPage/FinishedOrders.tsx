import TabPanel from "@mui/lab/TabPanel";
import OrderList from "./OrderList";

export default function FinishedOrders() {
  return (
    <TabPanel
      value="3"
      id="order-panel-3"
      aria-labelledby="order-tab-3"
      className="order-panel"
    >
      <OrderList status="finished" />
    </TabPanel>
  );
}
