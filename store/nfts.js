import React, { createContext, useContext, useMemo, useState } from "react";
import { NFTData } from "../constants/dummy";
import assets from "../constants/assets";
import { useUser } from "./user";

function seed() {
  const now = Date.now();
  return NFTData.map((it, i) => ({
    ...it,
    endAt: now + (i + 2) * 60 * 60 * 1000,
  }));
}

const Ctx = createContext(null);

export function NFTsProvider({ children }) {
  const [items, setItems] = useState(seed());

  const value = useMemo(() => {
    return {
      list: items,
      getById: (id) => items.find((x) => x.id === id),
      placeBid: ({ id, amount, bidder }) => {
        setItems((curr) =>
          curr.map((n) => {
            if (n.id !== id) return n;
            const price = Number(amount);
            const bid = {
              id: "BID-" + Date.now(),
              name: bidder?.name || "You",
              price,
              image: bidder?.avatar || assets.person02,
              date: new Date().toLocaleString(),
            };
            const bids = [bid, ...(n.bids || [])];
            return { ...n, price, bids };
          })
        );
      },
      setEndAt: (id, endAt) =>
        setItems((curr) =>
          curr.map((n) => (n.id === id ? { ...n, endAt } : n))
        ),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useNFTs() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useNFTs must be used inside NFTsProvider");
  return v;
}
