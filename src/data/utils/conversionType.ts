import { BookGet, BookSearch } from "../services/livroService"

export function transformBookSearchToBookGet(books:BookSearch[]) :BookGet[] {
    return books.filter(book => book.autores).map(book => ({
        ID: 0,
        autor: book.autores[0],
        urlCapa: book.imagem.smallThumbnail,                
        genero: book.genero[0],
        qtdPagina: book.qtdPaginas,
        resumo: book.descricao,
        titulo: book.titulo
    }))
}