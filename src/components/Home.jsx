import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './Navbar';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home() {
  const { auth, setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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


  const getRestCountries = async () => {
    try {
      const result = await axios.get("https://restcountries.com/v3.1/all");
      setData(result?.data);
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  useEffect(() => {
    getRestCountries();
  }, [])

  const columns = [
    {
      name: 'CCA2',
      selector: row => row?.cca2,
      sortable : true,
      cell: row => <b>{row?.cca2}</b>
    },
    {
      name: 'Common Name',
      selector: row => row?.name?.common,
      sortable : true,
      cell: row=> <b>{row?.name?.common}</b>
    },
    {
      name: 'Capital',
      selector: row => row?.capital,
      sortable : true,
      cell: row=> <b>{row?.capital}</b>
    },
    {
      name: 'Action',
      cell: row => <Link to={`/details/${row?.cca3}`} className='btn btn-outline-primary btn-sm fw-bold'>Details</Link>
    },
  ];

  return (
    <>
      <Navbar />
      <div className='container' style={{ marginTop: "9vh" }}>
        <DataTable
          columns={columns}
          data={data}
          pagination fixedHeader 
          fixedHeaderScrollHeight='780px' 
          selectableRows
          selectableRowsHighlight highlightOnHover responsive
        />
      </div>
    </>
  )
}
