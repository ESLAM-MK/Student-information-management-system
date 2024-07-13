import React from 'react';

const TimerBar = () => {
  return (
    <div>
      {/*  start bar timer  */}
      <div className="lg:mt-4 mt-8 mx-2 lg:mx-0">
        {/*  strat timer  */}
        <div className="lg:me-12 me-0">
          <h4 className="font-bold text-end text-xl fw-medium ">60:00</h4>
        </div>
        {/*  start bar  */}
        <div className="bar mt-3"></div>
      </div>
      {/*  end bar timer  */}
    </div>
  );
};

export default TimerBar;
