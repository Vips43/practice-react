import "./App.css";
import LogIn from "./form/LogIn";
import Signup from "./form/Signup";
import {
 createBrowserRouter,
 createRoutesFromElements,
 Route,
} from "react-router-dom";
import Cuisines from "./form/Cuisines";
import Home from "./form/Home";
import Navig from "./form/Navig";
import About from "./form/About";
import { RouterProvider } from "react-router";
import RootLayout from "./Layout/RootLayout";
import PasswordGen from "./compo/PasswordGen";
import NotesApp from "./compo/NotesApp/NotesApp";
import ColorApp from "./compo/color/ColorApp";
import MoviePage from "./compo/TMDB/MoviePage";
import RateReview from "./compo/Rate and review/RateReview";
import ToDoList from "./compo/todolist/ToDoList";
import FakeStore from "./compo/fakestore/FakeStore";
import Login from "./compo/user management/Login";
import MovieDetails from "./compo/TMDB/MOvieDetails";

function App() {

 const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path="/" element={<RootLayout />}>
    <Route index element={<Home />} />
    <Route path="register" element={<Signup />} />
    <Route path="login" element={<LogIn />} />
    <Route path="cuisine" element={<Cuisines />} />
    <Route path="about" element={<About />} />
    <Route path="navigation" element={<Navig />} />
    <Route path="/navigation/passgenapp" element={<PasswordGen />} />
    <Route path="/navigation/notepadapp" element={<NotesApp />} />
    <Route path="/navigation/colorapp" element={<ColorApp />} />
    <Route path="/navigation/tmdbapp" element={<MoviePage />} />
    <Route path="/tmdbapp/movie/:id" element={<MovieDetails />} />
    <Route path="/navigation/review" element={<RateReview />} />
    <Route path="/navigation/ToDoList" element={<ToDoList />} />
    <Route path="/navigation/fakestore" element={<FakeStore />} />
    <Route path="/navigation/usermgmt" element={<Login />} />
   </Route>
  )
 );

 return <RouterProvider router={router} />;
}

export default App;
