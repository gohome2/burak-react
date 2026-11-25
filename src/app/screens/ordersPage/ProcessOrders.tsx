import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { Messages } from "../../../lib/config";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import OrderList from "./OrderList";
import { retrieveProcessOrders } from "./selector";

interface ProcessOrdersProps {
  setValue: (value: string) => void;
}

export default function ProcessOrders({ setValue }: ProcessOrdersProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const processOrders = useSelector(retrieveProcessOrders);

  const finishOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (!window.confirm("Have you received your order?")) return;

      const order = new OrderService();
      await order.updateOrder({ orderId, orderStatus: OrderStatus.FINISH });
      setValue("3");
      setOrderBuilder(new Date());
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <OrderList orders={processOrders} onVerify={finishOrderHandler} />
    </TabPanel>
  );
}
