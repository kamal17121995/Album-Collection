import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CSS/NewAlbum.css";

//This Is Adding New Album And Dummy API Call For POST

function Newalbum(props) {
  const { albums, handleChangeAlbum } = props;

  const [Id, setId] = useState();
  const [userId, setUserID] = useState();
  const [title, setTitle] = useState("");

  function saveUser(e) {
    e.preventDefault();
    let data = { Id, userId, title };
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let newAlbum = data;
        let prevAlbums = albums;
        prevAlbums.push(newAlbum);
        handleChangeAlbum(prevAlbums);
        alert("ALbum added succefully")
    });
  }

  return (
    <div className="Album">
      <h1 id="albumHeading" className="mt-4">
          𝘼𝙙𝙙 𝘼𝙡𝙗𝙪𝙢 𝙏𝙤 𝙔𝙤𝙪𝙧 𝙇𝙞𝙨𝙩
      </h1>

      <Form>
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>𝑻𝒊𝒕𝒍𝒆</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Id">
          <Form.Label>𝗜𝗱</Form.Label>
          <Form.Control
            type="number"
            placeholder="ID"
            value={Id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>𝙐𝙨𝙚𝙧𝙄𝘿</Form.Label>
          <Form.Control
            type="text"
            placeholder="UserID"
            value={userId}
            onChange={(e) => {
              setUserID(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={saveUser}>
            𝑨𝒅𝒅 𝑻𝒐 𝑨𝒍𝒃𝒖𝒎
        </Button>
      </Form>
    </div>
  );
}

export default Newalbum;
