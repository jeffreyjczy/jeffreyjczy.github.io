import { useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuotationTable from "./QuotationTable";

import { Container, Form, Col, Row, Button, Alert } from 'react-bootstrap';

import useLocalStorage from "react-localstorage-hook";

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const disRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems", []);
  const [error, setError] = useState("");

  // const dataItems = []; // only temporary

  const dummyProductList = [
    { id: "p001", name: 'Chocolate Hershey', price: 35 },
    { id: "p002", name: 'Candy', price: 15 },
    { id: "p003", name: 'Lays Original', price: 30 },
    { id: "p004", name: 'KitKat', price: 25 },
    { id: "p005", name: 'M&M', price: 20 }
  ];





  
  const addItem = () => {
    if (itemRef.current.value === "") {
      setError("Please choose an item first.");
      return;
    }
    if (qtyRef.current.value === "") {
      qtyRef.current.value = 1;
    }
    if (disRef.current.value === "") {
      disRef.current.value = 0;
    }
    const pid = itemRef.current.value;
    const product = dummyProductList.find(e => e.id === pid);

    if (!product) {
      setError("Selected item could not be found.");
      return;
    }

    const quantity = Math.max(parseInt(qtyRef.current.value, 10) || 1, 1);
    const discount = Math.max(parseInt(disRef.current.value, 10) || 0, 0);
    const price = Math.max(parseFloat(ppuRef.current.value) || product.price, 0);

    var found = false;
    const nextItems = dataItems.map(items => {
      if (items.item === product.name && Number(items.ppu) === price) {
        found = true;
        return {
          ...items,
          qty: Number(items.qty) + quantity,
          dis: Number(items.dis) + discount
        };
      }
      return items;
    });
    if (!found) {
      var itemObj = {
        item: product.name,
        ppu: price,
        dis: discount,
        qty: quantity
      };
      nextItems.push(itemObj);
    }
    setDataItems(nextItems);
    setError("");
  }


  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value = product ? product.price : "";
  };

  const options = dummyProductList.map((v) => {
    return <option key={v.id} value={v.id}>{v.name}</option>
  })




  return (
    <div style={{ backgroundColor: '#34568B', minHeight:'100vh'}}>
      <Container style={{ minHeight: '80vh', color: 'white'}}>
        <Row>
          <Col xs={4} style={{ marginTop: '20vh' }}>
            <Form>
              {error && <Alert variant="warning">{error}</Alert>}
              <Form.Group className="mb-3" controlId="formItem">
                <Form.Label>Item</Form.Label>
                <Form.Select aria-label="Default select example" ref={itemRef} onChange={productChange}>
                  {options}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Price Per Unit" ref={ppuRef} defaultValue={dummyProductList[0].price} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formQauntity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="number" placeholder="Discount" ref={disRef} />
              </Form.Group>

              <Button variant="outline-light" onClick={addItem}>
                Add
              </Button>
            </Form>
          </Col>
          <Col style={{ marginTop: '18vh' }}>
            <QuotationTable data={dataItems} setDataItems={setDataItems} />
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default App;
