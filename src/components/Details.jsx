import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext';
import Navbar from './Navbar'

export default function Details() {
  const { auth, setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const { alphaCode } = useParams();
  const [details, setDetails] = useState();


  //on refresh setAuth if user is authenticated else send back to login page
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuth(true);
    } else if (auth === true) {
      setAuth(true);
    } else {
      navigate("/login");
    }
  }, [navigate, auth, setAuth]);

  useEffect(() => {
    const getDetails = async () => {
      const result = await axios.get(`https://restcountries.com/v3.1/alpha/${alphaCode}`);
      setDetails(result?.data);
    }
    getDetails();
  }, [alphaCode]);
  

    let Currencies = details?.[0]?.currencies;
    let items = [];
    for(let x in Currencies ){
      console.log(Currencies[x]?.name,"-", Currencies[x]?.symbol)
      items.push(<span key={x}>{Currencies[x]?.name - Currencies[x]?.symbol}</span>);
    }

    let Languages = details?.[0]?.languages;
    let items2 = [];
    for(let x in Languages ){
      items2.push(<span key={x}>{Languages[x]} | </span>);
    }

    
  return (
    <>
      <Navbar />
      <div className='container' style={{ marginTop: "10vh" }}>
        <h1 className='text-secondary'>Details</h1>
        <table className="table table-striped table-hover">
          <tbody>
            <tr>
              <th scope="row">Common Name</th>
              <td>{details?.[0]?.name?.common}</td>
            </tr>
            <tr>
              <th scope="row">Official Name</th>
              <td>{details?.[0]?.name?.official}</td>
            </tr>
            <tr>
              <th scope="row">Currencies</th>
              <td>{items}</td>
            </tr>
            <tr>
              <th scope="row">Languages</th>
              <td>{items2}</td>
            </tr>
            <tr>
              <th scope="row">Flag</th>
              <td>{
                details?.[0]?.flags?.png ? <img src={details?.[0]?.flags?.png} alt="" width='50' /> : 
                details?.[0]?.flags?.svg ? <img src={details?.[0]?.flags?.svg} alt="" width='50' /> : ""
              }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
