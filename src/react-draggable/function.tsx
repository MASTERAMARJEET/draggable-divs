import { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Counter } from '../Counter';
import './styles.css';

type Position = {
  x: number;
  y: number;
};

const ReactDraggableFunction = (): JSX.Element => {
  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState({
    x: 0,
    y: 0,
  });
  const [controlledPosition, setControlledPosition] = useState({
    x: -400,
    y: 200,
  });

  function handleDrag(e: DraggableEvent, ui: DraggableData) {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  }

  function onStart() {
    setActiveDrags((activeDrags) => ++activeDrags);
  }

  function onStop() {
    setActiveDrags((activeDrags) => --activeDrags);
  }
  // For controlled component
  function adjustXPos(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x: x - 10, y });
  }

  function adjustYPos(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x, y: y - 10 });
  }

  function onControlledDrag(e: DraggableEvent, position: Position) {
    const { x, y } = position;
    setControlledPosition({ x, y });
  }

  function onControlledDragStop(e: DraggableEvent, position: Position) {
    onControlledDrag(e, position);
    onStop();
  }
  const dragHandlers = { onStart, onStop };
  return (
    <div>
      <br />
      <h1>React Draggable (Functional)</h1>
      <p>Active DragHandlers: {activeDrags}</p>
      <p>
        <a href="https://github.com/mzabriskie/react-draggable/blob/master/example/index.html">
          Demo Source
        </a>
      </p>
      <Draggable {...dragHandlers}>
        <div className="box">I can be dragged anywhere</div>
      </Draggable>
      <Draggable axis="x" {...dragHandlers}>
        <div className="box cursor-x">
          I can only be dragged horizonally (x axis)
          <Counter />
        </div>
      </Draggable>
      <Draggable axis="y" {...dragHandlers}>
        <div className="box cursor-y">
          I can only be dragged vertically (y axis)
          <Counter />
        </div>
      </Draggable>
      <Draggable onStart={() => false}>
        <div className="box">I don't want to be dragged</div>
      </Draggable>
      <Draggable onDrag={handleDrag} {...dragHandlers}>
        <div className="box">
          <div>I track my deltas</div>
          <div>
            x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}
          </div>
          <Counter />
        </div>
      </Draggable>
      <Draggable handle="strong" {...dragHandlers}>
        <div className="box no-cursor">
          <strong className="cursor">
            <div>Drag here</div>
          </strong>
          <div>You must click my handle to drag me</div>
          <Counter />
        </div>
      </Draggable>
      <Draggable cancel="strong" {...dragHandlers}>
        <div className="box">
          <strong className="no-cursor">Can't drag here</strong>
          <div>Dragging here works</div>
          <Counter />
        </div>
      </Draggable>
      <Draggable grid={[25, 25]} {...dragHandlers}>
        <div className="box">I snap to a 25 x 25 grid</div>
      </Draggable>
      <Draggable grid={[50, 50]} {...dragHandlers}>
        <div className="box">I snap to a 50 x 50 grid</div>
      </Draggable>
      <Draggable
        bounds={{ top: -100, left: -100, right: 100, bottom: 100 }}
        {...dragHandlers}
      >
        <div className="box">I can only be moved 100px in any direction.</div>
      </Draggable>
      <div
        className="box"
        style={{
          height: '500px',
          width: '500px',
          position: 'relative',
          overflow: 'auto',
          padding: '0',
        }}
      >
        <div style={{ height: '1000px', width: '1000px', padding: '10px' }}>
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I can only be moved within my offsetParent.
              <br />
              <br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I also can only be moved within my offsetParent.
              <br />
              <br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
        </div>
      </div>
      <Draggable bounds="body" {...dragHandlers}>
        <div className="box">
          I can only be moved within the confines of the body element.
          <Counter />
        </div>
      </Draggable>
      <Draggable>
        <div
          className="box"
          style={{ position: 'absolute', bottom: '100px', right: '100px' }}
          {...dragHandlers}
        >
          I already have an absolute position.
          <Counter />
        </div>
      </Draggable>
      <Draggable defaultPosition={{ x: 25, y: 25 }} {...dragHandlers}>
        <div className="box">
          {
            "I have a default position of {x: 25, y: 25}, so I'm slightly offset."
          }
          <Counter />
        </div>
      </Draggable>
      <Draggable
        position={{ ...controlledPosition }}
        {...dragHandlers}
        onDrag={onControlledDrag}
      >
        <div className="box">
          My position can be changed programmatically. <br />I have a drag
          handler to sync state.
          <p>
            <a href="#" onClick={adjustXPos}>
              Adjust x ({controlledPosition.x})
            </a>
          </p>
          <p>
            <a href="#" onClick={adjustYPos}>
              Adjust y ({controlledPosition.y})
            </a>
          </p>
        </div>
      </Draggable>
      <Draggable
        position={{ ...controlledPosition }}
        {...dragHandlers}
        onStop={onControlledDragStop}
      >
        <div className="box">
          My position can be changed programmatically. <br />I have a dragStop
          handler to sync state.
          <p>
            <a href="#" onClick={adjustXPos}>
              Adjust x ({controlledPosition.x})
            </a>
          </p>
          <p>
            <a href="#" onClick={adjustYPos}>
              Adjust y ({controlledPosition.y})
            </a>
          </p>
        </div>
      </Draggable>
    </div>
  );
};

export default ReactDraggableFunction;
