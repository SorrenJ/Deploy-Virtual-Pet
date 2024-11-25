import React, { useState } from "react";

const DebugPage = () => {
  const [apiResults, setApiResults] = useState({});
  const [error, setError] = useState(null);

  const apiEndpoints = [
    { name: "Convert Score", route: "/api/convert-score" },
    { name: "Pets", route: "/api/pets" },
    { name: "Species", route: "/api/species" },
    { name: "User Pets", route: "/api/user-pets" },
    { name: "Home", route: "/api/home" },
    { name: "Clean Pet", route: "/api/clean-pet" },
    { name: "Feed Pet", route: "/api/feed-pet" },
    { name: "Play with Pet", route: "/api/play-with-pet" },
    { name: "Inventory", route: "/api/inventory" },
    { name: "Pets Stats", route: "/api/pets-stats" },
    { name: "Species Sprite", route: "/api/species/sprite" },
    { name: "Sleep Pet", route: "/api/sleep-pet" },
    { name: "Delete Pet", route: "/api/delete-pet" },
  ];

  const fetchData = async (route) => {
    try {
      setError(null);
      const response = await fetch(route);
      if (!response.ok) {
        throw new Error(`Error fetching ${route}: ${response.status}`);
      }
      const data = await response.json();
      setApiResults((prev) => ({ ...prev, [route]: data }));
    } catch (err) {
      setError(err.message);
    }
  };

  const renderApiResults = () => {
    return Object.keys(apiResults).map((route) => (
      <div key={route} style={{ marginBottom: "20px" }}>
        <h4>API Route: {route}</h4>
        <pre>{JSON.stringify(apiResults[route], null, 2)}</pre>
      </div>
    ));
  };

  const adoptPet = async () => {
    try {
      const payload = { species_id: "123", color_id: "456" };
      const response = await fetch("/api/adopt-pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error("Error adopting pet:", err);
    }
  };
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>API Debugging Page</h1>
      <p>Click a button below to test an API route and see the response.</p>

      {apiEndpoints.map((endpoint) => (
        <button
          key={endpoint.route}
          style={{ margin: "5px", padding: "10px 15px" }}
          onClick={() => fetchData(endpoint.route)}
        >
          Test {endpoint.name}
        </button>
      ))}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h2>API Responses</h2>
      {renderApiResults()}

      <h2>Instructions</h2>
      <ol>
        <li>Click on a button to test the corresponding API endpoint.</li>
        <li>View the response data or error message below.</li>
        <li>Check the console for detailed logs if needed.</li>
      </ol>
    
      <button onClick={adoptPet}>Test Adopt Pet</button>

    </div>
  );
};

export default DebugPage;
