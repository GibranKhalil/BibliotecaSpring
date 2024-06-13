import { Button } from "@/interface/components/buttons"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './view.module.scss'
import { limitText } from "@/data/utils";
import { BookOpen, Drama, PenTool } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { LivroService } from "@/data/services/livroService";
import { LoadingDots } from "@/interface/components/loading";

export const ViewBookPage = () => {
    const Livro = new LivroService();
    const navigateTo = useNavigate();
    const location = useLocation();
    const { title, author, img, gen, desc, pages } = location.state

    const book = useMutation({
        mutationKey: ['postBook'],
        mutationFn: async () => {
            const response = await Livro.postBook({ titulo: title, autor: author, urlCapa: img, genero: gen, qtdPagina: pages, resumo: desc })
            return response
        }
    })

    if (book.isPending) {
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
                    <Button onClick={() => navigateTo(-1)} className="button--ghost">Voltar</Button>
                </div>
            </section>
        </main>
    )
}