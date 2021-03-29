import React, { useState } from "react";

export function Approve({contract}) {
  const [to, setTo] = useState("");
  const [tokenId, setTokenId] = useState("");

  const handleClick = async () => {
    let _tokenId = parseInt(tokenId);
    if(_tokenId < 1) return;
    const tx = await contract.approve(to, _tokenId);
    const receipt = await tx.wait();
    receipt.status === 0 && console.log("Transaction failed");
    setTo("");
    setTokenId("");
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
          onChange={e => setTokenId(e.target.value)}
          value={tokenId} placeholder="Token ID..." required />
      </div>
      <button className="btn btn-primary" onClick={handleClick}>
        Approve
      </button>
    </div>
  );
}