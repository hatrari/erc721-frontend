import React, { useState } from "react";

export function Mint({contract}) {
  const [to, setTo] = useState("");
  const [hash, setHash] = useState("");

  const handleClick = async () => {
    if(to === "" || hash === "") return;
    const tx = await contract.mint(to, hash);
    const receipt = await tx.wait();
    receipt.status === 0 && console.log("Transaction failed");
    window.dispatchEvent(new CustomEvent("balanceChanged"));
    setTo("");
    setHash("");
  }

  return (
    <div className="p-4">
      <div className="form-group">
        <input className="form-control" type="text"
          onChange={e => setTo(e.target.value)}
          value={to} placeholder="To..." required />
      </div>
      <div className="form-group">
        <input className="form-control" type="text"
          onChange={e => setHash(e.target.value)}
          value={hash} placeholder="Hash..." required />
      </div>
      <button className="btn btn-primary" onClick={handleClick}>
        Mint
      </button>
    </div>
  );
}