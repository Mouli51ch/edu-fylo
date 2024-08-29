// src/app/WalletConnect.tsx
"use client";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useEffect } from "react";

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

export const WalletConnect = () => {
  const { activate, account, deactivate, active } = useWeb3React();

  useEffect(() => {
    if (localStorage.getItem("walletConnected") === "true") {
      activate(injected);
    }
  }, [activate]);

  const handleConnect = async () => {
    try {
      await activate(injected);
      localStorage.setItem("walletConnected", "true");
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = () => {
    try {
      deactivate();
      localStorage.removeItem("walletConnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <div>
      {active ? (
        <div>
          <p>Connected Account: {account}</p>
          <button onClick={handleDisconnect}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};
