"use client";
import { useState } from "react";

export default function TestAPI() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (endpoint, method = "GET", body = null) => {
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_LOCAL_URL || window.location.origin;
      const url = `${baseUrl}${endpoint}`;
      
      console.log(`Testing ${method} ${url}`);
      
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      if (body) {
        options.body = JSON.stringify(body);
      }
      
      const response = await fetch(url, options);
      const data = await response.json();
      
      const result = {
        endpoint,
        method,
        status: response.status,
        ok: response.ok,
        data,
        timestamp: new Date().toISOString(),
      };
      
      setResults(prev => [...prev, result]);
      console.log("Test result:", result);
    } catch (error) {
      const result = {
        endpoint,
        method,
        status: "ERROR",
        ok: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
      
      setResults(prev => [...prev, result]);
      console.error("Test error:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Environment Variables</h2>
        <div className="bg-gray-100 p-3 rounded">
          <p><strong>NEXT_PUBLIC_LOCAL_URL:</strong> {process.env.NEXT_PUBLIC_LOCAL_URL || "Not set"}</p>
          <p><strong>window.location.origin:</strong> {typeof window !== "undefined" ? window.location.origin : "Not available"}</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Test Buttons</h2>
        <div className="space-x-2">
          <button
            onClick={() => testEndpoint("/api/test-simple")}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test Simple API
          </button>
          
          <button
            onClick={() => testEndpoint("/api/health")}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test Health API
          </button>
          
          <button
            onClick={() => testEndpoint("/api/ai/user-response", "POST", {
              messages: [{ role: "user", content: "Hello" }],
              prompt: "Test prompt",
              model: "gemini"
            })}
            disabled={loading}
            className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Test AI API
          </button>
          
          <button
            onClick={clearResults}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Clear Results
          </button>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-3">Test Results</h2>
        {results.length === 0 ? (
          <p className="text-gray-500">No tests run yet. Click a test button above.</p>
        ) : (
          <div className="space-y-3">
            {results.map((result, index) => (
              <div key={index} className={`p-3 rounded border ${result.ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{result.method} {result.endpoint}</p>
                    <p className="text-sm text-gray-600">Status: {result.status}</p>
                    <p className="text-sm text-gray-600">Time: {result.timestamp}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${result.ok ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                    {result.ok ? "SUCCESS" : "FAILED"}
                  </span>
                </div>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                  {JSON.stringify(result.data || result.error, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
