import { useState } from 'react';

export const Counter = (): JSX.Element => {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((count) => ++count)}>
      I am clicked {count} times
    </button>
  );
};
