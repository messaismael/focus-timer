import React from 'react'
import './history.css'
import { Modal, Button, Table, Form, FormControl } from 'react-bootstrap'

function History( props ) {
    return (
        <Modal
            { ...props }
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    History
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </p>
                <p id='history'>
                    <Table className='table' striped bordered hover>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Start At</th>
                                <th>End At</th>
                            </tr>
                        </thead>
                        {
                            props.history.map( function ( item ) {
                                return (

                                    <tbody>
                                        <tr>
                                            <td>{ item.type }</td>
                                            <td>{ item.value }</td>
                                            <td>{ item.start }</td>
                                            <td>{ item.end }</td>
                                        </tr>
                                    </tbody>

                                )
                            } )
                        }
                    </Table>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={ props.onHide }>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default History;