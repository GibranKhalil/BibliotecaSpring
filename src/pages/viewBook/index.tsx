import { Button } from "@/interface/components/buttons"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './view.module.scss'
import { limitText } from "@/data/utils";
import { BookOpen, Drama, PenTool } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LivroService } from "@/data/services/livroService";
import { LoadingDots } from "@/interface/components/loading";
import { useState } from "react";
import { GenericModal } from "@/interface/components/modal";
import { Estante } from "@/data/services/estanteService";
export const ViewBookPage = () => {
    const Livro = new LivroService();
    const navigateTo = useNavigate();
    const location = useLocation();
    const { title, author, img, gen, desc, pages, id } = location.state
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [bookCaseId, setBookCaseId] = useState<number>(0)

    const book = useMutation({
        mutationKey: ['postBook'],
        mutationFn: async () => {
            const response = await Livro.postBook({ titulo: title, autor: author, urlCapa: img, genero: gen, qtdPagina: pages, resumo: desc })
            return response
        }
    })

    const addToBookCase = useMutation({
        mutationKey: ['patchBook'],
        mutationFn: async () => {
            const response = await Livro.addBookToBookCase(id, bookCaseId)
            return response
        }
    })

    const { data, isLoading } = useQuery({
        queryKey: ['getBookCase'],
        queryFn: async () => {
            const response = await Estante.getAll();
            return response
        }
    })

    if (book.isPending || addToBookCase.isPending) {
        return <main><LoadingDots /></main>
    }

    return (
        <main className={styles.main}>
            <section className={styles['main__poster']}>
                <img src={img} alt={`Capa do livro: ${title}-${author}`} />
                <article>
                    <div>
                        <i><BookOpen /></i>
                        <small>{pages}</small>
                    </div>
                    <div>
                        <i><Drama /></i>
                        <small>{gen}</small>
                    </div>
                    <div>
                        <i><PenTool /></i>
                        <small>{author}</small>
                    </div>
                </article>
            </section>
            <section className={styles['main__details']}>
                <div>
                    <h1>{title} - {author}</h1>
                    <p>{limitText(desc, 1550)}</p>
                </div>
                <div>
                    <Button onClick={() => book.mutateAsync()}>Salvar na biblioteca</Button>
                    {id && <Button onClick={() => setOpenModal(true)}>Adicionar a uma estante</Button>}
                    <Button onClick={() => navigateTo(-1)} className="button--ghost">Voltar</Button>
                </div>
            </section>
            {openModal && data && !isLoading &&
                <GenericModal
                    onCancel={() => setOpenModal(!openModal)}
                    onSubmit={() => addToBookCase.mutateAsync()}
                    title="Escolha uma Estante">
                    <form className={styles.modal}>
                        <fieldset>
                            <select onChange={(e) => setBookCaseId(Number(e.target.value))}>
                                {data.map((option, index) => (
                                    <option value={option.id} key={index}>{option.nome}</option>
                                ))}
                            </select>
                        </fieldset>
                    </form>
                </GenericModal>}
        </main>
    )
}