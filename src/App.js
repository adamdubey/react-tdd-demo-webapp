import "./App.css";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

function App() {
  return (
    <div className="container">
      <h1>Jotto!</h1>
      <Congrats success={false} />
      <GuessedWords guessedWords={[]} />
    </div>
  );
}

export default App;
