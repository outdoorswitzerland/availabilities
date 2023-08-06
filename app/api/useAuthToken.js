import { useState, useEffect } from "react";

const trekksoftApiBaseUrl = "https://api2.trekksoft.com";
const urlToken = `${trekksoftApiBaseUrl}/oauth2/token`;
const grantType = "client_credentials";
const clientId = "a882c2775e9ec35753e6e4b002da4643";
const clientSecret = "888e9e440978f0a4656c28ee3b7134784217db8ed4578ff2";

async function refreshAccessToken() {
  try {
    const res = await fetch(urlToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
}

function useAuthToken() {
  const [token, setToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  async function fetchAndSetToken() {
    const tokenData = await refreshAccessToken();
    if (tokenData) {
      setToken(tokenData.access_token);
      const expiryTime =
        new Date().getTime() + tokenData.expires_in * 1000 - 5 * 60 * 1000;
      setTokenExpiry(expiryTime);
    }
  }

  useEffect(() => {
    fetchAndSetToken();

    const tokenInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      if (currentTime >= tokenExpiry) {
        fetchAndSetToken();
      }
    }, 55 * 60 * 1000);

    return () => {
      clearInterval(tokenInterval);
    };
  }, []);

  return token;
}

export default useAuthToken;
