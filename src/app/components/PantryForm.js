import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { db } from '../../firebase/config';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const PantryForm = ({ item, onSave }) => {
  const [name, setName] = useState(item?.name || '');
  const [quantity, setQuantity] = useState(item?.quantity || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item?.id) {
      await updateDoc(doc(db, 'pantry', item.id), { name, quantity });
    } else {
      await addDoc(collection(db, 'pantry'), { name, quantity });
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {item?.id ? 'Update' : 'Add'}
      </Button>
    </form>
  );
};

export default PantryForm;
