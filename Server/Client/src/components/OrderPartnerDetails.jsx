import React from "react";

function OrderPartnerDetails({ partner }) {
  return (
    <div className=" absolute inline-block z-[401] right-10 bg-white border border-gray-600">
      <h1>Driver Details</h1>
      <h1>{partner.name}</h1>
      <p>{partner.phone}</p>
    </div>
  );
}

export default OrderPartnerDetails;
