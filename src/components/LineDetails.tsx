/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";

const LineDetails = ({ lineID }: { lineID: string }) => {
  const [lineDetail, setLineDetail] = useState<any>({});
  useEffect(() => {
    lineID &&
      fetch(`${API_URL}/Line/${lineID}/Route`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLineDetail(data);
        })
        .catch((err) => console.log(err));
  }, [lineID]);
  return (
    <div className="flex w-full justify-between">
      {lineDetail?.routeSections && (
        <>
          <div className="flex flex-col w-1/2 bg-slate-900 text-slate-50 px-2 py-10">
            <h4>START OF LINE</h4>
            {lineDetail?.routeSections[0]?.originationName}
          </div>
          <div className="flex flex-col w-1/2 bg-slate-900 text-slate-50 p-15 px-2 py-10">
            <h4>END OF LINE</h4>
            {lineDetail?.routeSections[0]?.destinationName}
          </div>
        </>
      )}
    </div>
  );
};

export default LineDetails;
