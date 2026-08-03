import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';

interface Book {
  _id?: string;
  title: string;
  author: string;
  status: 'Lido' | 'Não lido';
}

const API_URL = 'https://crudcrud.com/api/cf5b5d46af874928942a55e85d0d2298/livros';

export function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Book[]>(API_URL);
      setBooks(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar os livros da API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBooks();
  }, []);

  const handleAddBook = async (newBook: Book) => {
    try {
      const response = await axios.post<Book>(API_URL, newBook);
      setBooks(prevBooks => [...prevBooks, response.data]);
    } catch (err) {
      alert('Erro ao cadastrar o livro na API.');
      console.error(err);
    }
  };

  const handleDeleteBook = async (id?: string) => {
    if (!id) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
    } catch (err) {
      alert('Erro ao remover o livro.');
      console.error(err);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw',
      backgroundImage: `
        linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.25) 100%),
        url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1920&auto=format&fit=crop')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: '#f8fafc', 
      fontFamily: 'Inter, system-ui, sans-serif', 
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <header style={{ 
          textAlign: 'center', 
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(56, 189, 248, 0.4)'
        }}>
          <h1 style={{ 
            fontSize: '30px', 
            fontWeight: 800, 
            color: '#ffffff', 
            margin: 0, 
            letterSpacing: '-0.5px',
            textShadow: '0 0 20px rgba(56, 189, 248, 0.6)'
          }}>
            📖 Catálogo de Livros
          </h1>
          <p style={{ 
            fontSize: '13px', 
            color: '#7dd3fc', 
            marginTop: '8px', 
            fontWeight: 500, 
            letterSpacing: '0.3px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Bem-vindo ao Catálogo de Livros! Aqui você gerencia e organiza todo o seu acervo digital de leitura de forma prática.
          </p>
        </header>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '8px', color: '#fca5a5', fontSize: '14px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <BookForm onAddBook={handleAddBook} />

        <section>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 700, 
            marginBottom: '16px', 
            color: '#e2e8f0', 
            letterSpacing: '-0.3px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#38bdf8', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px #38bdf8' }}></span>
            Livros Cadastrados na Estante
          </h2>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#cbd5e1', padding: '20px' }}>Carregando dados da API...</p>
          ) : (
            <BookList books={books} onDeleteBook={handleDeleteBook} />
          )}
        </section>

      </div>
    </div>
  );
}

export default App;