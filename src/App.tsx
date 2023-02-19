import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies/:row/:movieId" element={<Home />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/tv" element={<Tv />}>
          <Route path=":row/:tvId" element={<Tv />}></Route>
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path=":movies/:movieId" element={<Search />}></Route>
          <Route path="?keyword:keyword" element={<Search />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
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
