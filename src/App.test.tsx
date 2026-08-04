import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App Component', () => {
  it('deve renderizar a aplicação corretamente', () => {
    render(<App />)
    const titulos = screen.getAllByText(/Catálogo de Livros/i)
    expect(titulos.length).toBeGreaterThan(0)
  })
})