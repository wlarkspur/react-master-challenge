import {
  BrowserRouter,
  createBrowserRouter,
  HashRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies/:row/:movieId" element={<Home />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":row/:tvId" element={<Tv />}></Route>
        </Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/movies/:movieId" element={<Search />}></Route>
        <Route path="/search/tv/:tvId" element={<Search />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);
