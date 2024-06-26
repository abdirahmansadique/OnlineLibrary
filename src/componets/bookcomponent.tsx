import  { useRef, useEffect } from 'react';

const BookForm = ({ onSubmit, currentBook }) => {
  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    if (currentBook) {
      titleRef.current.value = currentBook.title;
      authorRef.current.value = currentBook.author;
      yearRef.current.value = currentBook.year;
    }
  }, [currentBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {
      id: currentBook ? currentBook.id : Date.now(),
      title: titleRef.current.value,
      author: authorRef.current.value,
      year: yearRef.current.value
    };
    onSubmit(book);
    titleRef.current.value = '';
    authorRef.current.value = '';
    yearRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Book Title:</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" ref={authorRef} />
      </div>
      <div>
        <label htmlFor="year">Publication Year:</label>
        <input type="number" id="year" ref={yearRef} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
