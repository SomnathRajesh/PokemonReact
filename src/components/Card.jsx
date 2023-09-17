import React from 'react';
import { Fragment, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { RiSearch2Line } from 'react-icons/ri';
import './style.css';

const Card = ({ pokemon, loading }) => {
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [image, setImage] = useState();
  const [searchInput, setSearchInput] = useState('');
  const [abilities, setAbilities] = useState([]);
  const [stats, setStats] = useState([]);
  const [experience, setExperience] = useState();
  const [explev, setExpLev] = useState();

  const openPokeInfo = async (res) => {
    setName(res.name);
    setHeight(res.height);
    setWeight(res.weight);
    setImage(res.sprites.front_default);
    setAbilities(res.abilities);
    setStats(res.stats);
    setExperience(res.base_experience);
    if (res.base_experience > 200) {
      setExpLev('gold-card');
    } else if (res.base_experience > 100) {
      setExpLev('green-card');
    } else {
      setExpLev('grey-card');
    }
    handleShow();
  };

  return (
    <Fragment>
      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton className={`poke-header ${explev}`}>
          <Modal.Title id='name'>
            {name.charAt(0).toUpperCase() + name.slice(1, name.length)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`poke-content ${explev}`}>
          <img
            src={image}
            className='img-fluid img-height'
            alt='Responsive'
          ></img>
          <p>
            <u>Experience</u> :{experience}
          </p>
          <p>
            <u>Height</u> :{height}
          </p>
          <p>
            <u>Weight</u> :{weight}
          </p>
          <p>
            <u>Abilities</u>:
            {abilities.map((ability) => ability.ability.name).join(', ')}
          </p>
          <p>
            <u>Stats</u>:
            {stats
              .map((stat) => stat.stat.name + ':' + stat.base_stat)
              .join(', ')}
          </p>
        </Modal.Body>
      </Modal>

      <div class='form-group has-search' id='search'>
        <span class='fa fa-search form-control-feedback'>
          <RiSearch2Line className='search-icon' />
        </span>
        <input
          type='text'
          class='form-control'
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          placeholder='Search'
        />
      </div>

      <div className='row card-row'>
        {loading ? (
          <h1>Loading.....</h1>
        ) : (
          pokemon
            // eslint-disable-next-line
            .filter((item) => {
              if (searchInput === '') {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchInput.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => {
              //console.log(item);
              const cardClass =
                item.base_experience > 200
                  ? 'gold-card'
                  : item.base_experience > 100
                  ? 'green-card'
                  : 'grey-card';
              return (
                <div className='col-md-3' key={item.id}>
                  <div
                    className={`card poke-card ${cardClass}`}
                    key={item.id}
                    onClick={() => openPokeInfo(item)}
                  >
                    <img
                      className='card-img-top card-img'
                      src={item.sprites.front_default}
                      alt='Card cap'
                    ></img>
                    <div className='card-body'>
                      <span className='card-title poke-name' id='name'>
                        {item.name.charAt(0).toUpperCase() +
                          item.name.slice(1, item.name.length)}
                      </span>
                    </div>
                  </div>
                  <br />
                </div>
              );
            })
        )}
      </div>
    </Fragment>
  );
};

export default Card;
