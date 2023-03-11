import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

export default function UpdateAlbum(props) {
  const { id } = useParams();
  const location = useLocation();
  const { albm } = location.state;
  console.log({ albm }, 'hie')
  const { albums, handleChangeAlbum } = props;
  // let [album, setAlbum] = useState({ title: "", userId: "" });

  let [title, setTitle] = useState(albm.title);
  let [userId, setUserId] = useState(albm.userId);
  /// we are using the code in this file to update the albums 
  // useEffect(() => {
  //   let album = albums.find((elem) => elem.id === id);
  //   setAlbum(album);
  //   setTitle(album.title);
  //   setUserId(album.userId);
  // }, [id, albums]);

  const updateUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: title,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let updatedAlbums = albums.filter((album) => {
          return album.id !== id;
        });
        updatedAlbums.push(data);
        handleChangeAlbum(updatedAlbums, 'new data');
      });
  };

  function handleChange(e) {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setUserId(e.target.value);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body><div>
        <label htmlFor='title'>𝑻𝒊𝒕𝒍𝒆</label>
        <input
          type='text'
          value={title}
          name='title'
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <label htmlFor='title'>userId</label>
        <input
          type='text'
          value={userId}
          name='userId'
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <Button onClick={updateUser}> 𝐒𝐮𝐛𝐦𝐢𝐭</Button>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>

  );
}
