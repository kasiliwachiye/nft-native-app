import React, { createContext, useContext, useMemo, useState } from "react";

function randomAddress() {
  const hex = [...Array(40)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
  return "0x" + hex;
}

const Ctx = createContext(null);

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(100.0);
  const [address] = useState(randomAddress());
  const [txs, setTxs] = useState([]);

  const value = useMemo(
    () => ({
      address,
      balance,
      txs,
      canAfford: (amt) => Number(amt) <= balance,
      topUp: (amt) => {
        const v = Number(amt) || 0;
        setBalance((b) => b + v);
        setTxs((t) => [
          {
            id: String(Date.now()),
            type: "topup",
            amount: v,
            note: "Top up",
            at: new Date().toISOString(),
          },
          ...t,
        ]);
      },
      spend: (amt, note) => {
        const v = Number(amt) || 0;
        setBalance((b) => Math.max(0, b - v));
        setTxs((t) => [
          {
            id: String(Date.now()),
            type: "debit",
            amount: v,
            note,
            at: new Date().toISOString(),
          },
          ...t,
        ]);
      },
    }),
    [address, balance, txs]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWallet() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWallet must be used inside WalletProvider");
  return v;
}
