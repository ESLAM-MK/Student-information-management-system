import React from 'react';

function Buttons({ handleSubmit }) {
  return (
    <>
      <div className="command-buttons ">
        <button
          type="submit"
          onClick={handleSubmit}
          className="border-none text-gray-100 py-2 px-5 rounded ms-0 lg:ms-2"
          style={{ backgroundColor: '#e7bc3c' }}
        >
          save
        </button>
      </div>
    </>
  );
}

export default Buttons;
