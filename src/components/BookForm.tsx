import React, { useState } from 'react';

interface Book {
  _id?: string;
  title: string;
  author: string;
  status: 'Lido' | 'Não lido';
}

interface BookFormProps {
  onAddBook: (book: Book) => void;
}

export function BookForm({ onAddBook }: BookFormProps) {
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
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    }}>
      <h3 style={{ margin: 0, fontSize: '18px', color: '#ffffff', fontWeight: 700, letterSpacing: '-0.3px' }}>
        Adicionar Novo Livro
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 200px', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#38bdf8', marginBottom: '6px', letterSpacing: '0.5px' }}>TÍTULO DO LIVRO</label>
          <input type="text" placeholder="Ex: Inteligência Artificial" value={title} onChange={e => setTitle(e.target.value)} required style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#38bdf8', marginBottom: '6px', letterSpacing: '0.5px' }}>AUTOR(A)</label>
          <input type="text" placeholder="Ex: Stuart Russell" value={author} onChange={e => setAuthor(e.target.value)} required style={inputStyle} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#38bdf8', marginBottom: '6px', letterSpacing: '0.5px' }}>STATUS</label>
          <div style={{ position: 'relative' }}>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value as 'Lido' | 'Não lido')} 
              style={{
                ...inputStyle,
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                paddingRight: '40px',
                cursor: 'pointer'
              }}
            >
              <option value="Não lido" style={{ background: '#0f172a', color: '#fde047' }}>⏳ Não lido</option>
              <option value="Lido" style={{ background: '#0f172a', color: '#6ee7b7' }}>✅ Lido</option>
            </select>
            <div style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#38bdf8',
              fontSize: '14px',
              fontWeight: 'bold',
              textShadow: '0 0 8px rgba(56, 189, 248, 0.8)'
            }}>
              ▼
            </div>
          </div>
        </div>
      </div>

      <button type="submit" style={{ 
        background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', 
        color: '#ffffff', 
        border: 'none', 
        padding: '14px', 
        borderRadius: '10px', 
        fontWeight: 700, 
        cursor: 'pointer', 
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)'
      }}>
        + Salvar na API
      </button>
    </form>
  );
}