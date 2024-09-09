import { useState , useEffect} from 'react'
import { CreateArea, Footer, Header, Note } from './components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function getDataFromLS(){
  const lsData= localStorage.getItem('Keeper');
  if(lsData) return JSON.parse(lsData);
  else return [];
}
function App() {
  const [notes, setNotes] = useState(getDataFromLS());

  function addNote(newNote,date) {
    if(newNote.title.trim()==="" && newNote.content.trim()===""){
      toast.warn('Empty Note cannot be added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else {setNotes(prevNotes => {
      newNote.date=date;
      return [...prevNotes, newNote];
    });

    toast.success('Note added successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
    }
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

    toast.info('Note deleted successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
    
  }

  useEffect(()=>{
    localStorage.setItem('Keeper',JSON.stringify(notes));    
  },[notes]);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            date={noteItem.date}
            onDelete={deleteNote}
          />
        );
      })}
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default App
