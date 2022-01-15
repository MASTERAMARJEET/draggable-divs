import { useRef, useState } from 'react';
import './App.css';
import ReactDraggableClass from './react-draggable/class';
import ReactDraggableFunction from './react-draggable/function';
function App() {
  const [value, setValue] = useState('react-draggable-class');
  return (
    <div className="App">
      <label>Choose an Example:</label>
      <select
        name="cars"
        id="cars"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="react-draggable-class">react-draggable-class</option>
        <option value="react-draggable-function">
          react-draggable-function
        </option>
      </select>
      {value === 'react-draggable-function' ? (
        <ReactDraggableFunction />
      ) : (
        <ReactDraggableClass />
      )}
    </div>
  );
}

export default App;
