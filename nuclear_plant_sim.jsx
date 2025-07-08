import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ReactorSimulator = () => {
  const [temperature, setTemperature] = useState(300);
  const [pressure, setPressure] = useState(100);
  const [output, setOutput] = useState(0);
  const [reactorStatus, setReactorStatus] = useState("Stable");
  const [coolantLevel, setCoolantLevel] = useState(100);

  const adjustTemperature = (change) => {
    setTemperature((prev) => Math.max(0, prev + change));
  };

  const adjustPressure = (change) => {
    setPressure((prev) => Math.max(0, prev + change));
  };

  const adjustCoolantLevel = (change) => {
    setCoolantLevel((prev) => Math.min(100, Math.max(0, prev + change)));
  };

  useEffect(() => {
    const calculateOutput = () => {
      if (temperature > 500 || pressure > 150) {
        setReactorStatus("Critical");
        setOutput(0);
      } else if (temperature < 200 || pressure < 50 || coolantLevel < 20) {
        setReactorStatus("Suboptimal");
        setOutput(temperature * pressure * 0.002);
      } else {
        setReactorStatus("Stable");
        setOutput(temperature * pressure * 0.005);
      }
    };

    calculateOutput();
  }, [temperature, pressure, coolantLevel]);

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-xl font-bold">Nuclear Reactor Simulator</h1>

      <Card>
        <CardContent>
          <h2 className="text-lg">Reactor Status: {reactorStatus}</h2>
          <p>Temperature: {temperature}°C</p>
          <p>Pressure: {pressure} kPa</p>
          <p>Coolant Level: {coolantLevel}%</p>
          <p>Power Output: {output.toFixed(2)} MW</p>
          <Progress value={(output / 1000) * 100} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-2">
          <h3 className="text-lg">Controls</h3>
          <div className="grid gap-2">
            <Button onClick={() => adjustTemperature(20)}>Increase Temperature</Button>
            <Button onClick={() => adjustTemperature(-20)}>Decrease Temperature</Button>
            <Button onClick={() => adjustPressure(10)}>Increase Pressure</Button>
            <Button onClick={() => adjustPressure(-10)}>Decrease Pressure</Button>
            <Button onClick={() => adjustCoolantLevel(10)}>Add Coolant</Button>
            <Button onClick={() => adjustCoolantLevel(-10)}>Remove Coolant</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReactorSimulator;
