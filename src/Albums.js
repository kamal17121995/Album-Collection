import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import "./CSS/Album.css";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//For Fetching API Data

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [showModal, setShowModal] = useState({show: false, type: undefined, selectedId: undefined});
  const [inputData, setInputData] = useState({title: '', userId: ''});

  const clearModalAndInputData = () => {
    setInputData({ title: '', userId: '' })
    setShowModal({show: false})
  }

  const deleteUser = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        let updatedAlbums = albums.filter((album) => album.id !== id);
        toast("Album deleted succesfully")
        setAlbums(updatedAlbums)
      });
    });
  };

  const getAlbums = () => {
    fetch("https://jsonplaceholder.typicode.com/albums").then((result) => {
      result.json().then((resp) => {
        setAlbums(resp);
      });
    });
  };

  const updateUser = () => {
    let { selectedId: id } = showModal;
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: inputData.title,
        userId: inputData.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        let updatedAlbums = albums.filter((album) => {
          return album.id !== id ;
        });
        updatedAlbums.push(data);
        setAlbums(updatedAlbums)
        toast("Album updated succesfully")
        clearModalAndInputData();
      });
  };
  function saveUser() {
    const { title, userId } = inputData;
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({userId, title}),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlbums([...albums, data])
        toast("Album added succesfully")
        clearModalAndInputData();
    });
  }
  const onModalSubmit = () => {
    if (showModal.type === 'update') {
      updateUser();
    } else {
      saveUser();
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "title") {
      setInputData({...inputData, title: value});
    } else {
      setInputData({...inputData, userId: value});
    }
  }
  useEffect(() => {
    getAlbums();
  }, [])

  const mappedAlbum = albums
    .sort((a, b) => a.id - b.id)
    .map((album, index) => {
      return (
        <tr key={album.id}>
          <td className='text-center'>{index}</td>
          <td className='text-center' colSpan='2'>
            {album.userId}
          </td>
          <td className='text-center' colSpan='2'>
            {album.title}
          </td>
          <td className='text-center'>
            <Button size='lg' className='mb-4'
            onClick={() => {
              setShowModal({show: true, type: 'update', selectedId: album.id})
              setInputData({title: album.title, userId: album.userId});
            }}
            >
              Edit
            </Button>
            <Button
              size='lg'
              variant='danger'
              onClick={() => deleteUser(album.id)}
              className='mb-4'
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

  //If API Is Loading That Time Showing A Spinner While API Data Is Fetching
  const emptyAlbum = (
    <tr>
      <td colSpan='4' className='text-center'>
        <Spinner variant='info' animation='grow' />
      </td>
    </tr>
  );

  return (
    <div>
      <ToastContainer />
      <Button style={{ float: 'right'}} onClick={() => {
        setShowModal({show: true, type: 'new'})
      }}>Add New Album +</Button>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th className='text-center'>Sl No.</th>
            <th className='text-center' colSpan='2'>User Id</th>
            <th className='text-center' colSpan='2'>
              𝘼𝙡𝙗𝙪𝙢 𝙉𝙖𝙢𝙚
            </th>
            <th className='text-center'>𝘈𝘤𝘵𝘪𝘰𝘯𝘴</th>
          </tr>
        </thead>
        <tbody>{mappedAlbum.length > 0 ? mappedAlbum : emptyAlbum}</tbody>
      </Table>

      <Modal show={showModal.show} onHide={clearModalAndInputData}>
      <Modal.Header closeButton>
        <Modal.Title>
          {showModal.type === 'new' ? "Add new album" : "Edit album"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body><div>
        <label htmlFor='title'>𝑻𝒊𝒕𝒍𝒆</label>
        <input
          type='text'
          value={inputData.title}
          name='title'
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <label htmlFor='title'>userId</label>
        <input
          type='text'
          value={inputData.userId}
          name='userId'
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={clearModalAndInputData}>
          Close
        </Button>
        <Button variant="primary" onClick={onModalSubmit}>
        {showModal.type === 'new' ? "Add album" : "Update album"}
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default Albums;
