import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import PantryItem from './PantryItem';
import PantryForm from './PantryForm';
import { TextField } from '@mui/material';

const PantryList = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pantry'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <TextField
        label="Search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <PantryForm item={editItem} onSave={() => setEditItem(null)} />
      {filteredItems.map(item => (
        <PantryItem
          key={item.id}
          item={item}
          onEdit={setEditItem}
          onDelete={() => {}}
        />
      ))}
    </div>
  );
};

export default PantryList;
