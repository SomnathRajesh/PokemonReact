import React from 'react';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import './style.css';
import logo from '../poke.JPG';
import title from '../pokemon-logo-transparent.png';

const Cards = () => {
  const [count, setCount] = useState(0);
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=10');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [disable, setDisable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const pokeFunc = async () => {
    const result = await axios.get(url);
    //console.log(result);
    setCount(result.data.count);
    setNextUrl(result.data.next);
    setPrevUrl(result.data.previous);
    getPokeData(result.data.results);
    setLoading(false);

    if (result.data.previous != null) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const getPokeData = async (result) => {
    const newData = await Promise.all(
      result.map(async (item) => {
        const res = await axios.get(item.url);
        return res.data;
      })
    );

    setPokeData(newData);
  };

  useEffect(() => {
    pokeFunc();
  }, [url]);

  return (
    <Fragment>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='d-flex justify-content-center align-items-center w-100'>
          <a className='navbar-brand poke-nav' href='#'>
            <img
              src={logo}
              width='40'
              height='40'
              className='d-inline-block align-top'
              alt=''
            />
            <img
              src={title}
              width='200'
              height='40'
              className='d-inline-block align-top'
              alt=''
            />
          </a>
        </div>
      </nav>
      <div className='container'>
        <Card pokemon={pokeData} loading={loading}></Card>
        <div className='pagination-container'>
          <button
            type='button'
            id='previous'
            disabled={disable}
            className='btn btn-func'
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
              setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </button>
          &nbsp; &nbsp;
          <div className='pagination' id='pagination'>
            Page {currentPage} of {Math.ceil(count / 10)}
          </div>
          &nbsp; &nbsp;
          <button
            type='button'
            id='next'
            className='btn btn-func'
            onClick={() => {
              setPokeData([]);
              setUrl(nextUrl);
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Cards;
