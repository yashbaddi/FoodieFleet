import React from "react";

function OrderPartnerDetails({ partner }) {
  return (
    <div className="shadow-xl m-8 p-4 text-gray-700 w-56  rounded-2xl border-2">
      <h1 className="font-bold">Driver Details</h1>
      <h1 className="font-semibold">{partner.name}</h1>
      <p>{partner.phone}</p>
    </div>
  );
}

export default OrderPartnerDetails;
