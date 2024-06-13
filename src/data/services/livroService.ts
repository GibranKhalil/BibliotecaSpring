import mainRoute from "../config/API_CONFIG"

type ImagemType = {
    smallThumbnail: string
    thumbnail: string
}

export interface BookSearch {
    autores: string[],
    descricao: string,
    genero: string[],
    idioma: string,
    imagem: ImagemType,
    infoLink: string,
    previewLink: string,
    qtdPaginas: number,
    titulo: string,
}

export interface BookGet{
    ID: number,
    autor: string
    urlCapa: string
    genero: string
    qtdPagina: number
    resumo: string
    titulo: string
}

export class LivroService{
    async getAll(){
        try{
            const response = await mainRoute.get("/books");
            return response.data as BookGet[]
        }
        catch(error){
            console.error(error)
        }
    }

    async getBySearch(bookName: string){
        try{
            const refactorBookName = bookName.replace(" ", "+")
            const response = (await mainRoute.get(`/searchbook?book=${refactorBookName}`))
            return response.data as BookSearch[]
        }
        catch(error){
            console.error(error)
        }
    }

    async postBook(book: Omit<BookGet, "ID">){
        try{
            const response = (await mainRoute.post(`/books`, book))
            return response.data
        }
        catch(error){
            console.error(error)
        }
    }
}