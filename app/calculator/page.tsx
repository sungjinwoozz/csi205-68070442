"use client";

import { CheckLogin } from "@/utils/login";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Phase = "first" | "operator" | "second";
type Operator = "+" | "-" | "*" | "/";

type CalculatorState = {
  phase: Phase;
  display: string;
  first: number;
  second: number;
  operator: Operator | null;
  lastOperator: Operator | null;
};

const initialState: CalculatorState = {
  phase: "first",
  display: "0",
  first: 0,
  second: 0,
  operator: null,
  lastOperator: null,
};

function calculate(first: number, second: number, operator: Operator) {
  if (operator === "+") return first + second;
  if (operator === "-") return first - second;
  if (operator === "*") return first * second;
  return second === 0 ? NaN : first / second;
}

function formatDisplay(display: string) {
  const [integer, decimal] = display.split(".");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return decimal === undefined ? grouped : `${grouped}.${decimal}`;
}

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    CheckLogin(router, "/calculator");
  }, [router]);

  const [calculator, setCalculator] = useState(initialState);

  const numberClick = useCallback((number: string) => {
    setCalculator((current) => {
      if (current.phase === "operator") {
        return { ...current, display: number, phase: "second" };
      }
      if (current.display.length >= 9) return current;
      return {
        ...current,
        display: current.display === "0" ? number : `${current.display}${number}`,
      };
    });
  }, []);

  const operatorClick = useCallback((nextOperator: Operator) => {
    setCalculator((current) => {
      if (current.phase === "operator") return current;

      if (current.phase === "first") {
        return {
          ...current,
          first: Number(current.display),
          operator: nextOperator,
          phase: "operator",
        };
      }

      if (current.operator === null) return current;
      const second = Number(current.display);
      const result = calculate(current.first, second, current.operator);
      return {
        ...current,
        first: result,
        second,
        display: String(result),
        operator: nextOperator,
        lastOperator: current.operator,
        phase: "operator",
      };
    });
  }, []);

  const equalClick = useCallback(() => {
    setCalculator((current) => {
      let operator = current.operator;
      let second = current.second;
      let lastOperator = current.lastOperator;

      if (current.phase === "second") {
        second = Number(current.display);
        lastOperator = operator;
      } else if (current.phase === "operator") {
        second = current.first;
        lastOperator = operator;
      } else {
        operator = current.lastOperator;
      }

      if (operator === null) return current;
      const result = calculate(current.first, second, operator);
      return {
        phase: "first",
        display: String(result),
        first: result,
        second,
        operator,
        lastOperator,
      };
    });
  }, []);

  const clearClick = useCallback(() => setCalculator(initialState), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= "0" && event.key <= "9") numberClick(event.key);
      else if (event.key === "Enter" || event.key === "=") equalClick();
      else if (event.key === "Escape") clearClick();
      else if (event.key === "+") operatorClick("+");
      else if (event.key === "-") operatorClick("-");
      else if (event.key === "*") operatorClick("*");
      else if (event.key === "/") operatorClick("/");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearClick, equalClick, numberClick, operatorClick]);

  return (
    <main className="calculator-body">
      <section className="calculator" aria-label="Calculator">
        <div className="calculator-outer">
          <div className="calculator-inner">
            <div className="calculator-screen" aria-live="polite">
              {formatDisplay(calculator.display)}
            </div>

            <div className="calculator-button-row">
              <button className="calculator-green">MC</button>
              <button className="calculator-green">MR</button>
              <button className="calculator-green">M+</button>
              <button className="calculator-green">M-</button>
              <button className="calculator-red" onClick={clearClick}>CE</button>
            </div>
            <div className="calculator-button-row">
              <button className="calculator-purple" onClick={() => numberClick("7")}>7</button>
              <button className="calculator-purple" onClick={() => numberClick("8")}>8</button>
              <button className="calculator-purple" onClick={() => numberClick("9")}>9</button>
              <button className="calculator-green" onClick={() => operatorClick("/")}>/</button>
              <button className="calculator-green">sqrt</button>
            </div>
            <div className="calculator-button-row">
              <button className="calculator-purple" onClick={() => numberClick("4")}>4</button>
              <button className="calculator-purple" onClick={() => numberClick("5")}>5</button>
              <button className="calculator-purple" onClick={() => numberClick("6")}>6</button>
              <button className="calculator-green" onClick={() => operatorClick("*")}>*</button>
              <button className="calculator-green">%</button>
            </div>
            <div className="calculator-button-row">
              <button className="calculator-purple" onClick={() => numberClick("1")}>1</button>
              <button className="calculator-purple" onClick={() => numberClick("2")}>2</button>
              <button className="calculator-purple" onClick={() => numberClick("3")}>3</button>
              <button className="calculator-green" onClick={() => operatorClick("-")}>-</button>
              <button className="calculator-green">1/x</button>
            </div>
            <div className="calculator-button-row">
              <button className="calculator-purple" onClick={() => numberClick("0")}>0</button>
              <button className="calculator-purple">.</button>
              <button className="calculator-purple">+/-</button>
              <button className="calculator-green" onClick={() => operatorClick("+")}>+</button>
              <button className="calculator-green" onClick={equalClick}>=</button>
            </div>
          </div>
          <div className="calculator-student">68070442 พลภัทร สุขเมือง</div>
        </div>
      </section>
    </main>
  );
}
