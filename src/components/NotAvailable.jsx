import React from "react";

export default function NotAvailable() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col ">
      <div className="space-y-3">
        <h1 className="text-3xl my-3">No Data Available</h1>
        <p>Check Your Internet Connection or Report the Admin !</p>
      </div>
    </div>
  );
}
