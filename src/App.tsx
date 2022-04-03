import React, { useState, useEffect } from "react";
import Spinner from "./common/Spinner";
import LineDetails from "./components/LineDetails";
import Select from "./components/Select";
import { API_URL } from "./constants";
import { TLine, TMode } from "./entities";

function App(): JSX.Element {
  const [transportModes, setTransportModes] = useState<TMode[]>([]);
  const [transportLines, setTransportLines] = useState<TLine[]>([]);
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [selectedLine, setSelectedLine] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const modeSelectHandler = (e: React.FormEvent) => {
    const modeName = (e.target as HTMLSelectElement).value;
    setSelectedMode(modeName);
    setSelectedLine("");
  };

  const lineSelectHandler = (e: React.FormEvent) => {
    const lineID = (e.target as HTMLSelectElement).value;
    setSelectedLine(lineID);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/Line/Meta/Modes`)
      .then((response) => response.json())
      .then((data) => {
        setTransportModes(data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    selectedMode &&
      fetch(`${API_URL}/Line/Mode/${selectedMode}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTransportLines(data);
          setLoading(false);
          setError("");
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
  }, [selectedMode]);

  return (
    <main className="flex justify-center flex-col px-10 md:px-15 py-10">
      <h1 className="text-3xl font-bold">
        Transport For London Line Information
      </h1>
      <Select
        defaultText="Select a transport mode"
        options={transportModes.map((mode) => mode.modeName)}
        selected={selectedMode}
        selectHandler={modeSelectHandler}
      />
      {transportLines.length > 0 && (
        <Select
          defaultText="Select a transport line"
          options={transportLines.map((line) => line.name)}
          selected={selectedLine}
          selectHandler={lineSelectHandler}
        />
      )}
      <h3 className="text-xl font-bold uppercase">
        {selectedMode} · {selectedLine}
      </h3>
      {selectedLine && <LineDetails lineID={selectedLine} />}
      {loading && <Spinner />}
      {error && <h3>Something went wrong: {error}</h3>}
    </main>
  );
}

export default App;
