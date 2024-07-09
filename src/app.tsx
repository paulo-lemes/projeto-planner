import { useState } from "react";
import { Button } from "./components/Button";

export function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="bg-pattern bg-no-repeat bg-center h-screen flex flex-col justify-center items-center gap-4">
      <p>Hello World!</p>
      <p>{count}</p>
      <Button onClick={() => setCount((prev) => prev + 1)}>
        Aumentar contagem
      </Button>
    </div>
  );
}
