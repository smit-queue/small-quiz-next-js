'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Timer from '@/components/Timer'; 

const SecondPage = () => {
  const [data, setData] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    setIsTimeUp(false);
    setIsImageVisible(false);
    setCurrentQuestionIndex(0);
    setShowImage(true);
    setTimerKey(prevKey => prevKey + 1);
  }, [currentItemIndex]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
    setShowImage(false);
  };

  const handleShowImage = () => {
    setIsImageVisible(true);
  };

  const handleNext = () => {
    if (isTimeUp) {
      if (showImage) {
        setShowImage(false);
      } else {
        if (currentQuestionIndex < data[currentItemIndex]?.questions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setIsTimeUp(true);
          setShowImage(true);
        } else if (currentItemIndex < data.length - 1) {
          setCurrentItemIndex(prevIndex => prevIndex + 1);
          setIsTimeUp(true);
          setShowImage(true);
        }
      }
    } else {
      if (currentQuestionIndex < data[currentItemIndex]?.questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setIsTimeUp(false);
      } else if (currentItemIndex < data.length - 1) {
        setCurrentItemIndex(prevIndex => prevIndex + 1);
        setIsTimeUp(false);
      }
    }
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const item = data[currentItemIndex];
  const question = item.questions[currentQuestionIndex];

  return (
    <div className="container w-full h-full p-2">
      {!isTimeUp && showImage && (
        <div className="flex justify-end">
          <Timer key={timerKey} time={item.time} onTimeUp={handleTimeUp} />
        </div>
      )}

      {!isTimeUp && showImage && (
        <div className="min-w-full pl-16 pt-6">
          <div className="w-full">
            <Image 
              src={`/images/${item.image_url}`} 
              alt={`Item ${item.id}`}
              width={500}  
              height={300} 
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {isTimeUp && (
        <div className="min-w-full pl-16 pt-6">
          <div className="Questions">
            <ul>
              <li className='text-lg'>{question}</li>
            </ul>
          </div>

          {!isImageVisible && (
            <button
              className="relative h-8 w-38 m-6 overflow-hidden rounded-lg bg-red-600 text-sm shadow text-white hover:bg-red-700 pl-4 pr-4"
              onClick={handleShowImage}
            >
              Show Image
            </button>
          )}

          {isImageVisible && (
            <div className="flex row justify-center items-center">
              <div className="w-3/4 mt-4">
                <Image 
                  src={`/images/${item.image_url}`} 
                  alt={`Item ${item.id}`}
                  width={500}  
                  height={300} 
                  className="w-full h-auto"
                />

                <div className="flex justify-center items-center">
                  <button
                    className="relative h-8 w-38 m-6 overflow-hidden rounded-lg bg-blue-600 text-sm shadow text-white hover:bg-blue-800 pl-4 pr-4"
                    onClick={handleNext}
                  >
                    Move to Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SecondPage;

