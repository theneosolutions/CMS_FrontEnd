// App.js

import React from "react";

const Sidebar = () => {
  return (
    <div className="fixed h-full w-1/4 bg-gray-800 text-white p-4">
      {/* Your sidebar content goes here */}
      Sidebar Content
    </div>
  );
};

const MainContent = ({ children }) => {
  return (
    <div className="ml-1/4 p-4 overflow-y-auto h-screen">
      {/* Your main content goes here */}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <MainContent>
        {/* Your scrollable content goes here */}
        {/* Example: */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="p-4 mb-4 bg-gray-200">
            Item {index + 1}
          </div>
        ))}
      </MainContent>
    </div>
  );
};

export default App;
