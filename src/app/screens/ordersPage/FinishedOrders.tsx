import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import OrderList from "./OrderList";
import { retrieveFinishedOrders } from "./selector";

export default function FinishedOrders() {
  const finishedOrders = useSelector(retrieveFinishedOrders);

  return (
    <TabPanel value="3">
      <OrderList orders={finishedOrders} />
    </TabPanel>
  );
}
