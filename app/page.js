"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the ReactInternetSpeedMeter with a named import
const ReactInternetSpeedMeter = dynamic(
  () =>
    import("react-internet-meter").then((mod) => mod.ReactInternetSpeedMeter), // Ensure correct named import
  { ssr: false } // Disable server-side rendering for this component
);

export default function Home() {
  const [wifiSpeed, setWifiSpeed] = useState(null);
  const [loading, setLoading] = useState(true); // State to control spinner visibility

  // Trigger the speed test once the component mounts (useEffect will only run on the client)
  useEffect(() => {
    setLoading(true); // Show the spinner when the test starts
    console.log("Checking internet speed...");
  }, []); // Empty dependency array to ensure it only runs once when the component mounts

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white text-center p-6 rounded-lg max-w-lg w-full">
        {/* ReactInternetSpeedMeter handles the speed test */}
        <ReactInternetSpeedMeter
          txtSubHeading="Internet is too slow"
          outputType="alert"
          customClassName={null}
          txtMainHeading="Oops..."
          pingInterval={1000} // The interval for each speed test (8 seconds)
          thresholdUnit="megabyte" // Set the unit of speed as "megabyte"
          threshold={100} // Threshold speed limit in megabytes (adjust as necessary)
          imageUrl="https://a.storyblok.com/f/114532/1920x700/fb5a85ac23/awaken-soul-of-artist-1920x700.jpg"
          downloadSize="1781287" // Size of the download in bytes (adjust for actual testing)
          callbackFunctionOnNetworkDown={(speed) => {
            setLoading(false); // Hide spinner if the network is down
            console.log(`Internet speed is down: ${speed}`);
          }}
          callbackFunctionOnNetworkTest={(speed) => {
            setWifiSpeed(speed); // Set wifi speed when the test completes
            setLoading(false); // Hide the loading spinner
            console.log(`Current speed: ${speed} Mbps`);
          }}
        />
      </div>

      {/* Show the loading spinner while the speed test is in progress */}
      {loading && (
        <div className="mt-4 flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-solid border-gray-700 rounded-full border-t-transparent"></div>
        </div>
      )}

      {/* Display the calculated speed once the test completes */}
      {wifiSpeed && !loading && (
        <div className="mt-4 text-xl">
          <h3>Current Speed: {wifiSpeed/2} Mbps</h3>
        </div>
      )}
    </div>
  );
}
