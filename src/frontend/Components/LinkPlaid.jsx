import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function LinkPlaid() {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [linking, setLinking] = useState(false);

  const onSuccess = useCallback(async (publicToken) => {
    await fetch("/api/plaid/exchangePublicToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_token: publicToken }),
    });

    window.location.href = "/";
  }, []);

  let isOauth = false;

  const config = { token, onSuccess, onExit: () => setLinking(false) };

  // For OAuth, configure the received redirect URI
  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  async function createLinkToken() {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes("?oauth_state_id=")) {
      const linkToken = localStorage.getItem("link_token");
      setToken(linkToken);
    }
    //
    else {
      const response = await fetch("/api/plaid/createLinkToken");
      const data = await response.json();
      setToken(data.link_token);
      localStorage.setItem("link_token", data.link_token);
    }
  }

  useEffect(() => {
    if (!token) createLinkToken();
  }, []);

  useEffect(() => {
    if (isOauth && ready) open();
  }, [token]);

  return (
    <div className="flex grow justify-center items-center">
      {!ready || linking ? (
        <div className="text-blue-500">
          <Loading />
        </div>
      ) : (
        <button
          className={
            "flex text-white border-0 py-2 px-8 focus:outline-none rounded text-md " +
            (!ready || linking
              ? "bg-gray-400"
              : "bg-blue-500 hover:bg-blue-600")
          }
          onClick={() => {
            setLinking(true);
            open();
          }}
          disabled={!ready || linking}
        >
          Link account with Plaid
        </button>
      )}
    </div>
  );
}
