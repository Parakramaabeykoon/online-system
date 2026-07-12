import { useState } from "react";

export default function TestPage() {
  const [count, setCount] = useState("100");
  const [status, setStatus] = useState("Online");

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-amber-100 text-white flex flex-col justify-center items-center gap-[25px]">
        <div className="flex justify-center items-center flex-row gap-[25px]">
          <button
            onClick={() => {
              console.log("Incresing.......");
              setCount(count - 1);
            }}
            className="w-[100px] bg-accent h-[40px] rounded-lg"
          >
            -
          </button>
          <span className="text-accent text-5xl">{count}</span>

          <button
            onClick={() => {
              console.log("Adding...");
              setCount(count + 1);
            }}
            className="w-[100px] bg-accent h-[40px] rounded-lg "
          >
            +
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-[25px]">
          <span className="text-accent text-5xl ">{status}</span>
          <div className="flex flex-row gap-[25px]">
            <button
              onClick={() => setStatus("offline")}
              className="w-[100px] bg-accent h-[40px] rounded-lg "
            >
              Offline
            </button>
            <button
              onClick={() => setStatus("Deactive")}
              className="w-[100px] bg-accent h-[40px] rounded-lg "
            >
              Deactivate
            </button>
            <button
              onClick={() => setStatus("online")}
              className="w-[100px] bg-accent h-[40px] rounded-lg "
            >
              Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
