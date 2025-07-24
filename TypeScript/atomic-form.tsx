import React, { useState } from 'react';

export function MyComponent({ initialValue = '' }) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter something"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Example usage of the component
export default function App() {
  return <MyComponent initialValue="Hello" />;
}