import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import UploadOffer from '../components/UploadOffer';

const AddOffer = ({OnAdd}) => {
  return (
    <div>
       <UploadOffer OnAdd={OnAdd}/>
    </div>
  )
}

export default AddOffer
