import React, { useEffect, useState } from 'react';
import { Container, Row, Col, FormControl, Button } from 'react-bootstrap';
import LostItemCard from '../Cards/LostFoundCard';
import AddLostItemsModal from '../Modals/AddLostItemsModal'


const LostFound = () => {

    const [lostItems, setLostItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(lostItems);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fetchLostItems = async () => {
        try {
            const response = await fetch('https://vercel-backend-gilt.vercel.app/lostAndfound/get-lost-items');
            if (response.ok) {
                const data = await response.json();
                setLostItems(data);
            } else {
                throw new Error('Failed to fetch lost items');
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchLostItems();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            // If the search field is empty, fetch all items
            fetchLostItems();
        } else {
            // Fetch the search results based on the query
            fetchSearchResults(query);
        }
    };


    const fetchSearchResults = async (query) => {
        try {
            const response = await fetch(`https://vercel-backend-gilt.vercel.app/lostAndfound/search-item?name=${query}`);
            const data = await response.json();
            setFilteredItems(data);
        } catch (error) {
            console.error(error);
            // Handle any errors
        }
    };

    const handleRemoveItem = (itemId) => {
        // Remove the returned item from the list
        setLostItems((prevLostItems) => prevLostItems.filter((item) => item._id !== itemId));
    };

    const handleCloseModal = () => {
        setShowModal(false);
      };

    const handleAddLostItem = async (name, description, location) => {
        try {
          const response = await fetch('https://vercel-backend-gilt.vercel.app/lostAndfound/add-item', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, location }),
          });
    
          if (response.ok) {
            setShowModal(false);
            alert('Lost item added successfully');
            fetchLostItems();
          } else {
            throw new Error('Failed to add the lost item');
          }
        } catch (error) {
          console.error(error);
          // Handle any errors
        }
      };

    return (
        <Container>
            <h1 className="text-center">Lost items</h1>
            <Button variant="primary" onClick={()=>{
                setShowModal(true);
             }}>
                Add Item
            </Button>
            {showModal && (
                <AddLostItemsModal show={true} onClose={handleCloseModal} onAdd={handleAddLostItem} />
            )}
            <br/><br/><br/>
            <Row>
                <Col className="text-center">
                    <FormControl
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Col>
            </Row>
            <br /> <br />
            <Row>
                {searchQuery.trim() === '' ? (
                    lostItems.map((lostItem) => (
                        !lostItem.isReturned && (
                            <Col key={lostItem.id} sm={12} md={6} lg={4} xl={3}>
                                <LostItemCard lostItem={lostItem} onRemoveItem={handleRemoveItem} />
                            </Col>
                        )
                    ))
                ) : (
                    filteredItems.map((lostItem) => (
                        !lostItem.isReturned && (
                            <Col key={lostItem.id} sm={12} md={6} lg={4} xl={3}>
                                <LostItemCard lostItem={lostItem} onRemoveItem={handleRemoveItem} />
                            </Col>
                        )
                    ))
                )}

            </Row>
            
        </Container>
        

    );
};

export default LostFound;
