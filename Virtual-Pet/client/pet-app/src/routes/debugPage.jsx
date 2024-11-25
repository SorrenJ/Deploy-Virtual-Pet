import React, { useState } from "react";

const DebugPage = () => {
  const [apiResults, setApiResults] = useState({});
  const [databaseData, setDatabaseData] = useState(null);
  const [error, setError] = useState(null);

  const apiEndpoints = [
    { name: "Convert Score", route: "http://localhost:5000/api/convert-score" },
    { name: "Pets", route: "http://localhost:5000/api/pets" },
    { name: "Species", route: "http://localhost:5000/api/species" },
    { name: "User Pets", route: "http://localhost:5000/api/user-pets" },
    { name: "Home", route: "http://localhost:5000/api/home" },
    { name: "Clean Pet", route: "http://localhost:5000/api/clean-pet" },
    { name: "Feed Pet", route: "http://localhost:5000/api/feed-pet" },
    { name: "Play with Pet", route: "http://localhost:5000/api/play-with-pet" },
    { name: "Inventory", route: "http://localhost:5000/api/inventory" },
    { name: "Pets Stats", route: "http://localhost:5000/api/pets-stats" },
    { name: "Species Sprite", route: "http://localhost:5000/api/species/sprite" },
    { name: "Sleep Pet", route: "http://localhost:5000/api/sleep-pet" },
    { name: "Delete Pet", route: "http://localhost:5000/api/delete-pet" },
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

  const fetchDatabase = async () => {
    try {
      setError(null);
      const response = await fetch("/api/database");
      if (!response.ok) {
        throw new Error(`Error fetching database: ${response.status}`);
      }
      const data = await response.json();
      setDatabaseData(data);
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

  const renderDatabaseData = () => {
    if (!databaseData) return null;
    return (
      <div>
        <h2>MongoDB Database</h2>
        {Object.keys(databaseData).map((collection) => (
          <div key={collection} style={{ marginBottom: "20px" }}>
            <h4>Collection: {collection}</h4>
            <pre>{JSON.stringify(databaseData[collection], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
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

      <button
        style={{ margin: "5px", padding: "10px 15px", backgroundColor: "#007BFF", color: "#fff" }}
        onClick={fetchDatabase}
      >
        Fetch Entire Database
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h2>API Responses</h2>
      {renderApiResults()}

      {renderDatabaseData()}

      <h2>Instructions</h2>
      <ol>
        <li>Click on a button to test the corresponding API endpoint.</li>
        <li>View the response data or error message below.</li>
        <li>Click "Fetch Entire Database" to see all collections and documents.</li>
        <li>Check the console for detailed logs if needed.</li>
      </ol>
    </div>
  );
};

export default DebugPage;
