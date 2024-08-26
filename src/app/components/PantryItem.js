import { Button } from '@mui/material';
import { db } from '../../firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';

const PantryItem = ({ item, onEdit, onDelete }) => {
  const handleDelete = async () => {
    await deleteDoc(doc(db, 'pantry', item.id));
    onDelete();
  };

  return (
    <div>
      <h3>{item.name}</h3>
      <p>Quantity: {item.quantity}</p>
      <Button onClick={() => onEdit(item)}>Edit</Button>
      <Button onClick={handleDelete} color="secondary">Delete</Button>
    </div>
  );
};

export default PantryItem;
