import mainRoute from "../config/API_CONFIG";
import { BookGet } from "./livroService";

interface BookCase{
    id: number,
    nome: string,
    descricao: string
}

class EstanteService{
    async getAll(){
        try{
            const response = await mainRoute.get("/bookcase");
            return response.data as BookCase[];
        }
        catch(error){
            console.error(error)
        }
    }

    async postBookCase(bookCase: Omit<BookCase, "id">){
        try{
            const response = await mainRoute.post("/bookcase", bookCase)
            return response.status
        }
        catch(error){
            console.error(error)
        }
    }

    async deleteEstante(ID: number){
        try{
            const response = await mainRoute.delete(`/bookcase/${ID}`)
            return response.status
        }
        catch(error){
            console.error(error)
        }
    }

    async getBooks(ID: number){
        try{
            const response = await mainRoute.get(`/bookcasebooks/${ID}`)
            return response.data as BookGet[]
        }
        catch(error){
            console.error(error)
        }
    }
}

export const Estante = new EstanteService();