import { useState, useEffect } from "react";

function useRailRoutes(type) {
  const [routes, setRoutes] = useState([]);

  const API_KEY = "b2RU44pXMiPzCdedeiTtdwAS6EBBaEMX";

  async function fetchRoutes() {
    const response = await fetch(
      `https://transit.land/api/v2/rest/routes?operator_onestop_id=o-drt-mbta&route_type=${type}&format=geojson`,
      {
        headers: {
          apikey: API_KEY,
        },
      }
    );
    try {
      const data = await response.json();
      setRoutes(data.features);
    } catch {
      console.log("error fetching routes!");
    }
  }

  useEffect(() => {
    fetchRoutes();
  }, []);

  return routes;
}

export default useRailRoutes;
