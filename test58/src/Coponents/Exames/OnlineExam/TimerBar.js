import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TimerBar({ duration ,laterDateNow }) {
  const navigate = useNavigate();
  //  create a timer object

  const [timeLeft, setTimeLeft] = useState(0);
  //   create a timer object effect
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = prevTimeLeft + 1;
        localStorage.setItem('timeLeft', newTimeLeft.toString());
        return newTimeLeft;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }
  
  useEffect(() => {
    if (timeLeft >= duration * 3600) {
      localStorage.removeItem('timeLeft');
      navigate('/');
    }
  }, [timeLeft, duration, navigate]);
  // width bar
  const barWidth = `${(timeLeft / duration / 3600) * 100}%`;
  return (
    <>
      {/*  start bar timer  */}
      <div class="mt-lg-3 mt-5 mx-2 mx-lg-0">
        {/*  strat timer  */}
        <div class="me-lg-5 me-0">
          <h4 class="text-white text-end fw-medium">{formatTime(timeLeft)}</h4>
        </div>
        {/*  start bar  */}
        <div className="bg-white rounded mt-3">
          <div
            className="bar "
            style={{
              width: barWidth,
            }}
          />
        </div>
      </div>
    </>
  );
}
