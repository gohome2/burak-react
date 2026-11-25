import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { Messages } from "../../../lib/config";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import OrderList from "./OrderList";
import { retrievePausedOrders } from "./selector";

interface PausedOrdersProps {
  setValue: (value: string) => void;
}

export default function PausedOrders({ setValue }: PausedOrdersProps) {
  const { authMember, setOrderBuilder } = useGlobals();
  const pausedOrders = useSelector(retrievePausedOrders);

  const deleteOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (!window.confirm("Do you want to delete the order?")) return;

      const order = new OrderService();
      await order.updateOrder({ orderId, orderStatus: OrderStatus.DELETE });
      setOrderBuilder(new Date());
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (orderId: string) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (!window.confirm("Do you want to proceed with payment?")) return;

      const order = new OrderService();
      await order.updateOrder({ orderId, orderStatus: OrderStatus.PROCESS });
      setValue("2");
      setOrderBuilder(new Date());
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="1">
      <OrderList
        orders={pausedOrders}
        onCancel={deleteOrderHandler}
        onPayment={processOrderHandler}
      />
    </TabPanel>
  );
}
