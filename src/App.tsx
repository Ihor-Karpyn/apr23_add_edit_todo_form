/* eslint-disable */

import {
  FC, useEffect, useRef, useState,
} from 'react';
import './App.scss';

let intervalId: any;

export const App: FC = () => {
  const [birthday, setBirthday] = useState<Date>(new Date(0));
  const [maxDate, setMaxDate] = useState<Date>(new Date());
  const [minDate, setMinDate] = useState<Date>(new Date(0));
  const [cellPhone, setCellPhone] = useState<string>('380000000000');
  const [step, setStep] = useState(1);

  const [noX, setNoX] = useState<number | undefined>(undefined);
  const [noY, setNoY] = useState<number | undefined>(undefined);

  const [letters, setLetters] = useState<(string[])[]>([['', 'a', '', 'b', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
  const [catcherPosition, setCatcherPosition] = useState<number>(0);
  const [name, setName] = useState<string[]>([]);
  const catcherPositionRef = useRef<number>(0);

  const moveRight = () => {
    setCatcherPosition((prev) => {
      if (prev === 4) {
        return prev;
      }

      const newPosition = prev + 1;

      catcherPositionRef.current = newPosition;

      return newPosition;
    });
  };

  const moveLeft = () => {
    setCatcherPosition((prev) => {
      if (prev === 0) {
        return prev;
      }

      const newPosition = prev - 1;

      catcherPositionRef.current = newPosition;

      return newPosition;
    });
  };

  const generateRow = () => {
    const row = [];

    for (let i = 0; i < 5; i++) {
      const shouldAddLetter = Math.random() > 0.7;

      if (!shouldAddLetter) {
        row.push('');
        continue;
      }

      const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);

      row.push(letter);
    }

    return row;
  };

  useEffect(() => {
    setName([]);
    setLetters([['', 'l', 'o', 'x', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']]);
  }, [step]);

  const moveRow = () => {
    setLetters((prevLetters) => {
      const newRow = generateRow();
      const lastRowToRemove = prevLetters[prevLetters.length - 1];
      const newRows = [
        newRow,
        ...prevLetters.slice(0, prevLetters.length - 1),
      ];

      const catcherPositionFromRef = catcherPositionRef.current;

      const letterToAdd = lastRowToRemove[catcherPositionFromRef];

      if (letterToAdd) {
        setName((prevName) => [...prevName, letterToAdd]);
      }

      return newRows;
    });
  };

  useEffect(() => {
    intervalId = setInterval(moveRow, 1000);

    window.document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        moveLeft();
      }

      if (e.key === 'ArrowRight') {
        moveRight();
      }
    });
  }, []);

  const gerFormatedCellPhone = () => {
    const cellPhoneArray = cellPhone.split('');

    cellPhoneArray.splice(0, 3, '(', ...cellPhoneArray.slice(0, 3));
    cellPhoneArray.splice(4, 0, ')');
    cellPhoneArray.splice(5, 0, ' ');
    cellPhoneArray.splice(8, 0, '-');
    cellPhoneArray.splice(12, 0, '-');

    return cellPhoneArray.join('');
  };

  const onEarlierClick = () => {
    setMaxDate(birthday);

    const offset = (birthday.getTime() - minDate.getTime()) / 2;

    setBirthday(new Date(birthday.getTime() - offset));
  };

  const onLaterClick = () => {
    setMinDate(birthday);

    const offset = (maxDate.getTime() - birthday.getTime()) / 2;

    setBirthday(new Date(birthday.getTime() + offset));
  };

  useEffect(() => {
    if (name.length === 5) {
      clearInterval(intervalId);
    }
  }, [name]);

  return (
    <div>
      {step === 1 && (
        <>
          <h1>Your birthday?</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              type="button"
              disabled={birthday.getTime() === minDate.getTime()}
              onClick={onEarlierClick}
            >
              Earlier
            </button>
            <h3>{birthday.toLocaleDateString()}</h3>
            <button
              type="button"
              disabled={birthday.getTime() === maxDate.getTime()}
              onClick={onLaterClick}
            >
              Later
            </button>
          </div>
          <button
            style={{
              marginTop: '16px',
              marginLeft: '100px',
            }}
            type="button"
            onClick={() => setStep(2)}
          >
            Yes!!!
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1>Your cell phone</h1>
          <input
            style={{
              width: '100vw',
            }}
            type="range"
            min="380000000000"
            max="389999999999"
            value={cellPhone}
            onChange={(e) => setCellPhone(e.target.value)}
          />
          <p>{gerFormatedCellPhone()}</p>

          <button
            style={{
              marginTop: '16px',
              marginLeft: '100px',
            }}
            type="button"
            onClick={() => setStep(3)}
          >
            Yes!!!
          </button>
        </>
      )}

      {step === 3 && (
        <div className="field">
          <h1>What is your name?</h1>
          <div className="moveArea">
            {letters.map((row) => {

              return row.map((letter) => {

                return (
                  <div className="letter">
                    {letter}
                  </div>
                );
              });
            })}
          </div>
          <div className="catcherWrapper">
            <div className={catcherPosition === 0 ? 'catcher catcher-active' : 'catcher'} />
            <div className={catcherPosition === 1 ? 'catcher catcher-active' : 'catcher'} />
            <div className={catcherPosition === 2 ? 'catcher catcher-active' : 'catcher'} />
            <div className={catcherPosition === 3 ? 'catcher catcher-active' : 'catcher'} />
            <div className={catcherPosition === 4 ? 'catcher catcher-active' : 'catcher'} />
          </div>
          <div className="control">
            <button onClick={moveLeft} className="moveButton">{'<==='}</button>
            <button onClick={moveRight} className="moveButton">{'===>'}</button>
          </div>
          <p style={{ textAlign: 'center' }}>or use arrow btn</p>
          <div className="nameWrapper">
            {name.map((letter, index) => (
              <div key={`${letter}-${index}`} className="letter">
                {letter}
              </div>
            ))}
          </div>
          {name.length === 5 && (
            <button
              style={{
                marginTop: '16px',
                marginLeft: '100px',
              }}
              type="button"
              onClick={() => setStep(4)}
            >
              Yes!!!
            </button>
          )}
        </div>
      )}

      {step === 4 && (
        <>
          <h1>You so strong!!! Do you want to try again?</h1>
          <button
            onClick={() => {
              window.location.reload();
            }}
            type="button"
            style={{
              padding: '20px',
              marginRight: '20px',
            }}
          >
            Yes
          </button>
          <button
            style={{
              position: 'fixed',
              top: noY,
              left: noX,
              padding: '16px',
            }}
            onMouseEnter={() => {
              const randomX = Math.floor(Math.random() * window.innerWidth);
              const randomY = Math.floor(Math.random() * window.innerHeight);

              setNoX(randomX);
              setNoY(randomY);
            }}
            onClick={() => {
              const randomX = Math.floor(Math.random() * window.innerWidth);
              const randomY = Math.floor(Math.random() * window.innerHeight);

              setNoX(randomX);
              setNoY(randomY);
            }}
            className="noBtn"
          >
            No
          </button>
        </>
      )}
    </div>
  );
};
