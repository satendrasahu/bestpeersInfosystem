import React, { useEffect, useState } from 'react'
import PersistentDrawerLeft from './components/Navigation'
import { Product } from './components/Product'
import './App.css'
import { Switch,Route } from 'react-router'
import { Home } from './components/Home.jsx'
import { Cart } from './components/CartComponents/Cart'
import PersistentDrawerSmall from './components/MobNav'
/**
* @author
* @function App
**/

const useWindowSize = ()=>
{
  const [size, setSize] = useState([window.innerHeight,window.innerWidth])
  useEffect(()=>{
    const handelResize = () => {
      setSize([window.innerHeight,window.innerWidth]);
          }
          window.addEventListener("resize",handelResize);
          return()=>{
            window.removeEventListener("resize",handelResize)
          }
  },[])
  return size
}

 const App = (props) => {
  const [height, width] = useWindowSize();
  // const [width] = useWindowSize();
  return(
    <>
    {width <800 ? <PersistentDrawerSmall/>:<PersistentDrawerLeft/>}
    
      
    <Switch>
      <Route exact path ="/" component={Home}/>
      <Route exact path ="/products" component={Product}/>
      <Route exact path ="/cart" component={Cart}/>
    </Switch>
    
    </>
   )

 }

 export default App

 export {useWindowSize}