import { BookItem } from './BookItem';

interface Book {
  _id?: string;
  title: string;
  author: string;
  status: 'Lido' | 'Não lido';
}

interface BookListProps {
  books: Book[];
  onDeleteBook: (id?: string) => void;
}

export function BookList({ books, onDeleteBook }: BookListProps) {
  if (books.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: '#cbd5e1', 
        padding: '40px', 
        backgroundColor: 'rgba(255, 255, 255, 0.06)', 
        borderRadius: '16px', 
        border: '1px dashed rgba(56, 189, 248, 0.4)'
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