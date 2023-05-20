import { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import Tile from "../components/Tile";
import { IDataSet, IStatistics } from "../data/types/index";
import { calculateMean, calculateMedian, calculateStandardDeviation, calculateMode } from "../utils/statistic_calculations"

const HomeScreen: React.FC = () => {
  const [dataset, setDataset] = useState<IDataSet>({ data: [], name: '' });
  const [newNumber, setNewNumber] = useState<number>(0);

  useEffect(() => {
    loadDataset();
  }, []);


  const loadDataset = async () => {
    try {
      const response = await axios.get('https://my.api.mockaroo.com/statistics?key=8b03c030');
      const newDataset: IDataSet = response.data;
      setDataset(newDataset);
    } catch (error) {
      alert('Error loading dataset');
    }
  };

  const handleAddNumber = () => {
    if (newNumber !== undefined) {
      const updatedDataset = {
        ...dataset,
        data: [...dataset.data, newNumber],
        name: dataset.name
      };
      setDataset(updatedDataset);
    }
  };

  const calculateStatistics = (dataSet: IDataSet): IStatistics => {
    const data = dataSet.data
    const mean = calculateMean(data);
    const median = calculateMedian(data);
    const stdDev = calculateStandardDeviation(data);
    const mode = calculateMode(data);
    return { mean, median, stdDev, mode };
  };

  const statistics = useMemo(() => calculateStatistics(dataset), [dataset]);

  return (
    <div className="h-screen overflow-scroll p-6">
      <div className="flex flex-col justify-center items-center flex-wrap mt-4 gap-8">
        <div>
          <h1 className="font-extrabold text-2xl text-white text-center md:text-8xl">
            Analytics
          </h1>
          <p className="text-center text-white text-sm mt-4">
            Analyze your data and make better decisions
          </p>
          <p className="text-center text-white text-sm mt-4">
            Data set: {dataset.name} Total numbers: {dataset.data.length}
          </p>
        </div>
        <div className="flex flex-row flex-wrap gap-8 justify-center mt-16">
          {Object.entries(statistics).map(([stat, value], index) => {
            return (
              <Tile stat={stat} value={Number(value)} key={index} />
            )
          })}
        </div>
        <button onClick={() => loadDataset()} className="p-3.5 text-sm rounded-md text-white font-semibold  bg-purple-600 hover:scale-[98%]">
          Change Data Set
        </button>
        <div className="flex flex-row gap-4">
          <input value={newNumber} onChange={(e) => setNewNumber(Number(e.target.value))} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Add a number" type="number" />
          <button onClick={() => handleAddNumber()} className="p-3.5 text-sm rounded-md text-white font-semibold  bg-purple-600 hover:scale-[98%]">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
