import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // Exclusão direta sem o pop-up de confirmação
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
        
        {/* Cabeçalho */}
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

        {/* Formulário */}
        <BookForm onAddBook={handleAddBook} />

        {/* Listagem */}
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

interface BookFormProps {
  onAddBook: (book: Book) => void;
}

function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState<'Lido' | 'Não lido'>('Não lido');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    onAddBook({ title, author, status });
    setTitle('');
    setAuthor('');
    setStatus('Não lido');
  };

  const inputStyle = {
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    border: '1px solid rgba(56, 189, 248, 0.45)',
    padding: '14px 16px',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  const selectStyle = {
    ...inputStyle,
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
    MozAppearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%2338bdf8' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '18px',
    paddingRight: '40px',
    cursor: 'pointer'
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.08)', 
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(56, 189, 248, 0.4)', 
      padding: '30px', 
      borderRadius: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px', 
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)' 
    }}>
      <h3 style={{ 
        margin: 0, 
        fontSize: '18px', 
        color: '#ffffff', 
        fontWeight: 700,
        letterSpacing: '-0.3px',
        borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
        paddingBottom: '10px'
      }}>
        Adicionar Novo Livro
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 200px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#38bdf8', marginBottom: '6px', fontFamily: 'monospace' }}>TÍTULO DO LIVRO</label>
          <input 
            type="text" 
            placeholder="Ex: Inteligência Artificial" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#38bdf8', marginBottom: '6px', fontFamily: 'monospace' }}>AUTOR(A)</label>
          <input 
            type="text" 
            placeholder="Ex: Stuart Russell" 
            value={author} 
            onChange={e => setAuthor(e.target.value)} 
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#38bdf8', marginBottom: '6px', fontFamily: 'monospace' }}>STATUS</label>
          <select 
            value={status} 
            onChange={e => setStatus(e.target.value as 'Lido' | 'Não lido')}
            style={selectStyle}
          >
            <option value="Não lido" style={{ background: '#0f172a', color: '#fde047' }}>⏳ Não lido</option>
            <option value="Lido" style={{ background: '#0f172a', color: '#6ee7b7' }}>✅ Lido</option>
          </select>
        </div>
      </div>

      <button type="submit" style={{ 
        background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', 
        color: '#ffffff', 
        border: '1px solid rgba(255, 255, 255, 0.3)', 
        padding: '14px', 
        borderRadius: '10px', 
        fontWeight: 700, 
        cursor: 'pointer', 
        fontSize: '14px',
        letterSpacing: '0.5px',
        boxShadow: '0 8px 25px rgba(56, 189, 248, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        textTransform: 'uppercase'
      }}>
        + Salvar na API
      </button>
    </form>
  );
}

interface BookListProps {
  books: Book[];
  onDeleteBook: (id?: string) => void;
}

function BookList({ books, onDeleteBook }: BookListProps) {
  if (books.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: '#cbd5e1', 
        padding: '40px', 
        backgroundColor: 'rgba(255, 255, 255, 0.06)', 
        borderRadius: '16px', 
        border: '1px dashed rgba(56, 189, 248, 0.4)',
        backdropFilter: 'blur(12px)'
      }}>
        Nenhum livro cadastrado na API no momento.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {books.map(book => (
        <BookItem key={book._id} book={book} onDeleteBook={onDeleteBook} />
      ))}
    </div>
  );
}

interface BookItemProps {
  book: Book;
  onDeleteBook: (id?: string) => void;
}

function BookItem({ book, onDeleteBook }: BookItemProps) {
  return (
    <div style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.08)', 
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(56, 189, 248, 0.35)',
      padding: '20px 24px', 
      borderRadius: '14px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: '16px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }}>
      <div>
        <h4 style={{ margin: 0, fontSize: '17px', color: '#ffffff', fontWeight: 700, letterSpacing: '-0.2px' }}>
          {book.title}
        </h4>
        <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#cbd5e1', fontFamily: 'monospace' }}>
          Autor: <span style={{ color: '#ffffff' }}>{book.author}</span>
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ 
          fontSize: '12px', 
          fontWeight: 700, 
          padding: '6px 14px', 
          borderRadius: '20px', 
          backgroundColor: book.status === 'Lido' ? 'rgba(6, 95, 70, 0.6)' : 'rgba(113, 63, 18, 0.6)',
          color: book.status === 'Lido' ? '#6ee7b7' : '#fde047',
          border: `1px solid ${book.status === 'Lido' ? '#047857' : '#a16207'}`,
          letterSpacing: '0.5px'
        }}>
          {book.status}
        </span>
        <button 
          onClick={() => onDeleteBook(book._id)}
          style={{ 
            backgroundColor: 'rgba(220, 38, 38, 0.25)', 
            border: '1px solid rgba(248, 113, 113, 0.5)', 
            color: '#fca5a5', 
            padding: '9px 16px', 
            borderRadius: '10px', 
            cursor: 'pointer', 
            fontSize: '13px', 
            fontWeight: 600
          }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default App;