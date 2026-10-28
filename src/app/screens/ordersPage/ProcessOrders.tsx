import TabPanel from "@mui/lab/TabPanel";
import OrderList from "./OrderList";

export default function ProcessOrders() {
  return (
    <TabPanel
      value="2"
      id="order-panel-2"
      aria-labelledby="order-tab-2"
      className="order-panel"
    >
      <OrderList status="process" />
    </TabPanel>
  );
}
