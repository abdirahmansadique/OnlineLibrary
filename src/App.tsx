
import './App.scss';
import { UseLocalStorage } from './componets/localStorage';
import { useState, useEffect } from 'react';

interface Book {
  name: string;
  author: string;
  year: string;
}

function App() {
  const { setItem, getItem, deleteItem } = UseLocalStorage("sadque");
  const [list, setList] = useState<Book[]>([]);
  const [inputValue, setInput] = useState<Book>({ name: 'Akidatul_Tawhid', author: 'Alfauzan', year: '2000' });
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const storedList = getItem();
    if (storedList.length > 0) {
      setList(storedList);
    }
  }, []);

  useEffect(() => {
    setItem(list);
  }, [list]);

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.name.trim() === '' || inputValue.author.trim() === '' || inputValue.year.trim() === '') return;
    setList([...list, inputValue]);
    setInput({ name: '', author: '', year: '' });
  };

  const deleteItemFromList = (index: number) => {
    setList(list.filter((_, i) => i !== index));
  };

  const editItem = (index: number, newValue: Book) => {
    const updatedList = [...list];
    updatedList[index] = newValue;
    setList(updatedList);
  };

  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.year.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // Get only the first 5 items

  return (
    <div className='mainDiv'>
      <div className='head'>
        <div className='header'>
          <h1>Online Salafiyu Maktaba</h1>
        </div>
        <div className='formm'>
          <form className='formm' onSubmit={addItem}>
            <input type="text" className='form' placeholder='Name' value={inputValue.name} onChange={(e) => setInput({ ...inputValue, name: e.target.value })} />
            <input type="text" className='form' placeholder='Author' value={inputValue.author} onChange={(e) => setInput({ ...inputValue, author: e.target.value })} />
            <input type="text" className='form' placeholder='Year' value={inputValue.year} onChange={(e) => setInput({ ...inputValue, year: e.target.value })} />
            <button className='btn' type="submit">Submit</button>
          </form>
          <input 
            type="text" 
            className='form' 
            placeholder='Search For Book' 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>
      <div className='InputList'>
        <div>
          <ul className='list'>
            {filteredList.map((item, index) => (
              <li key={index}>
                <div>
                  <span>Name: {item.name}</span>
                  <span>Author: {item.author}</span>
                  <span>Year: {item.year}</span>
                </div>
                <button onClick={() => deleteItemFromList(index)} className='del'>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
