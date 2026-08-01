interface Book {
  _id?: string;
  title: string;
  author: string;
  status: 'Lido' | 'Não lido';
}

interface BookItemProps {
  book: Book;
  onDeleteBook: (id?: string) => void;
}

export function BookItem({ book, onDeleteBook }: BookItemProps) {
  return (
    <div style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.08)', 
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(56, 189, 248, 0.35)',
      padding: '20px 24px', 
      borderRadius: '14px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      gap: '16px'
    }}>
      <div>
        <h4 style={{ margin: 0, fontSize: '17px', color: '#ffffff', fontWeight: 700 }}>
          {book.title}
        </h4>
        <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#cbd5e1' }}>
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
          border: `1px solid ${book.status === 'Lido' ? '#047857' : '#a16207'}`
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