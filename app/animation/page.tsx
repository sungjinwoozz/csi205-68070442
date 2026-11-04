'use client';

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";

import basketballImage from "../assets/basketball.png";
import fieldImage from "../assets/field.jpg";
import footballImage from "../assets/football.png";
import humanImage from "../assets/stdempimg.png";
import volleyballImage from "../assets/volleyball.png";

type BallType = "none" | "basketball" | "football" | "volleyball" | "human";

type AnimationProps = {
  fieldWidth?: number;
  fieldHeight?: number;
  ballRadius?: number;
  velocity?: number;
};

const Animation = ({
  fieldWidth,
  fieldHeight,
  ballRadius,
  velocity,
}: AnimationProps) => {
  const _fieldHeight = fieldHeight ?? 480;
  const _fieldWidth = fieldWidth ?? 640;
  const _ballRadius = ballRadius ?? 50;
  const _velocity = velocity ?? 100;

  const ballDiameter = 2 * _ballRadius;
  const xMax = _fieldWidth - ballDiameter;
  const yMax = _fieldHeight - ballDiameter;
  const frameRate = 30;
  const rotationSpeed = 5;

  const speed = useRef(_velocity);
  const speedUpChance = 0.5;
  const speedUpMultiplier = 2;
  const maxSpeed = 300;

  useEffect(() => {
    speed.current = _velocity;
  }, [_velocity]);

  const [ballType, setBallType] = useState<BallType>("none");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);
  const moveRight = useRef(true);
  const moveDown = useRef(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIsRunning((current) => !current);
      } else if (event.key === "0") {
        setBallType("none");
      } else if (event.key === "1") {
        setBallType("basketball");
      } else if (event.key === "2") {
        setBallType("football");
      } else if (event.key === "3") {
        setBallType("volleyball");
      } else if (event.key === "4") {
        setBallType("human");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isRunning) return undefined;

    const timer = setInterval(() => {
      setX((currentX) => {
        const nextX =
          currentX + (moveRight.current ? speed.current : -speed.current) / frameRate;
        if (nextX <= 0 || nextX >= xMax) {
          moveRight.current = !moveRight.current;
          if (Math.random() < speedUpChance) {
            speed.current = Math.min(speed.current * speedUpMultiplier, maxSpeed);
          }
        }
        return Math.max(0, Math.min(nextX, xMax));
      });
      setY((currentY) => {
        const nextY =
          currentY + (moveDown.current ? speed.current : -speed.current) / frameRate;
        if (nextY <= 0 || nextY >= yMax) {
          moveDown.current = !moveDown.current;
          if (Math.random() < speedUpChance) {
            speed.current = Math.min(speed.current * speedUpMultiplier, maxSpeed);
          }
        }
        return Math.max(0, Math.min(nextY, yMax));
      });
      setRotation((currentRotation) => currentRotation + rotationSpeed);
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [isRunning, xMax, yMax]);

  const ballImages: Partial<Record<Exclude<BallType, "none">, StaticImageData>> = {
    football: footballImage,
    volleyball: volleyballImage,
    basketball: basketballImage,
    human: humanImage,
  };
  const selectedBallImage = ballType === "none" ? undefined : ballImages[ballType];

  //view
  return (
    <>
      <div>
        {/* {animation} */}
        <div className="mx-auto mt-3 w-fit">
          {/* field */}
          <div
            className="relative overflow-hidden rounded border-2 border-black"
            style={{
              width: `${_fieldWidth}px`,
              height: `${_fieldHeight}px`,
              backgroundImage: `url(${fieldImage.src})`,
            }}
          >
            {/* ball */}
            <div
              className="absolute rounded-full border border-black"
              style={{
                width: `${ballDiameter}px`,
                height: `${ballDiameter}px`,
                left: `${x}px`,
                top: `${y}px`,
                backgroundColor: "lightcyan",
                backgroundImage: selectedBallImage
                  ? `url(${selectedBallImage.src})`
                  : "none",
                backgroundPosition: "center",
                backgroundSize: "cover",
                transform: `rotate(${rotation}deg)`,
              }}
            />
          </div>
          {/* button row */}
          <div className="mt-2 flex items-center justify-between gap-4">
            {/* // play  */}
            <button
              className={`rounded border px-3 py-2 text-white transition-colors ${
                isRunning
                  ? "border-red-700 bg-red-600 hover:bg-red-700"
                  : "border-green-700 bg-green-600 hover:bg-green-700"
              }`}
              onClick={() => setIsRunning((current) => !current)}
            >
              {isRunning ? "⏸ pause" : "▶ run"}
            </button>
            {/* //  balltype */}
            <div className="flex justify-end gap-2">
              <button
                className="rounded border border-gray-400 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
                onClick={() => setBallType("none")}
              >
                None
              </button>
              <button
                className="rounded border border-blue-600 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                onClick={() => setBallType("basketball")}
              >
                Basketball
              </button>
              <button
                className="rounded border border-blue-600 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                onClick={() => setBallType("football")}
              >
                Football
              </button>
              <button
                className="rounded border border-blue-600 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                onClick={() => setBallType("volleyball")}
              >
                volleyball
              </button>
              <button
                className="rounded border border-blue-600 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                onClick={() => setBallType("human")}
              >
                Human
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animation;
