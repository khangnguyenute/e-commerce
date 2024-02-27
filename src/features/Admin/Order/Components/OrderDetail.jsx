import { beautifyNumber } from "@utils/Helpers";

function OrderDetail({ selectedOrder }) {
  const orderItems = selectedOrder?.orderItems;

  const amountPaid = selectedOrder?.totalPrice;

  return (
    <div className="w-full">
      <div className="mx-auto min-w-full rounded-xl border-2 px-6 text-base">
        <tbody className="text-center">
          {orderItems?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="pr-6">
                  <img src={item.image} className="mx-auto h-14 object-contain" alt="" />
                </td>
                <td className="w-[250px] py-4 pr-6 text-left text-gray-900">
                  <p className="whitespace-normal break-words">{item.name}</p>
                  <p className="font-medium">Hãng: {item.category}</p>
                </td>
                <td className="pr-6 text-gray-900">
                  <p className="text-red-500">{beautifyNumber(item.price * (1 - item.discount))}₫</p>
                  <p className="line-through">{beautifyNumber(item.price)}₫</p>
                </td>
                <td className="pr-6 text-gray-900">
                  <b className="">{item.quantity}</b>
                </td>
                <td className="text-gray-900">
                  <b className="text-red-500">
                    {beautifyNumber(item.price * (1 - item.discount) * item.quantity)}₫
                  </b>
                </td>
              </tr>
            );
          })}
        </tbody>
        <div className="mt-4 border-t text-left">
          <p className="my-4 text-right font-bold">
            <span>Tổng tiền: </span>
            <span className="text-red-500">{beautifyNumber(amountPaid)}₫</span>
          </p>
        </div>
      </div>

      <div className=" my-4 text-left text-base">
        <p className="font-bold">Địa chỉ và thông tin người đặt hàng</p>
        <ul>
          <li>
            <span className="font-bold">Anh: </span>
            {selectedOrder?.phone}
          </li>
          <li>
            <span className="font-bold">Địa chỉ nhận hàng: </span>
            {selectedOrder?.address}
          </li>
          <li>
            <span className="font-bold">Thời gian đặt hàng: </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OrderDetail;
