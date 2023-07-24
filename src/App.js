import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navhead from './components/Navhead'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Footer from './components/Footer'
import Category from './pages/Category';
import CategoryId from './pages/CategoryId';
import Products from "./pages/Products"
import ProductId from "./pages/ProductId"

function App() {
  return (
    <>
       <Navhead/>
      <Routes> 
        <Route path='/' element={<Home/>} />
        <Route path='categories' element={<Category/>}>
        <Route path=':categoryid' element={<CategoryId/>}/>
        </Route>
        <Route path='product' element={<Products/>}>
          <Route path=':productsid' element={<ProductId/>}/>
        </Route>
      </Routes>
      <Footer/> 
      
      
    </>
  );
}

export default App;
