import React, { useState, useRef, useCallback } from 'react'
import useBookSerach from './useBookSerach'

export default function App() {
  const [ query, setQuery ] = useState('')
  const [pageNumber, setpageNumber] = useState(1)

const { books, hasMore, loading, error } = useBookSerach(query, pageNumber)
const observer = useRef()
const lastBookElementRef = useCallback(node => {
  if(loading) return
  if (observer.current) observer.current.disconnect()
  observer.current = new IntersectionObserver(entries => {
   if(entries[0].isIntersecting && hasMore) {
     setpageNumber(prevPageNumber => prevPageNumber + 1 )
     console.log('Visible')
   }
  })
  if (node) observer.current.observe(node)
  console.log(node)
}, [loading, hasMore])


function handleSearch(e) {
  setQuery(e.target.value)
  setpageNumber(1)
}


  return (
    <>
   <input type="text" value={query} onChange={handleSearch}></input>
   {books.map((book, index) => {
     if(books.length === index + 1){
      return <div ref={lastBookElementRef} key={book}>{book}</div>
     } else{
      return <div key={book}>{book}</div>
     }
     
   })}
   <div>{loading && 'Loading......'}</div>
   <div>{error && 'Error'}</div>
   </>
  );
}

//export default App;
