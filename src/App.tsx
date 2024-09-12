import style from './App.module.css'
import Form from "./Components/Form/Form";
import useWeather from "./hooks/useWeather";
function App() {
  const { fetchWeather } = useWeather();
  return (
    <>
      <h1 className={style.title}>Buscador de Clima</h1>
      <div className={style.container}>
        <Form fetchWeather={fetchWeather} />
        <p>2</p>
      </div>
    </>
  );
}

export default App
