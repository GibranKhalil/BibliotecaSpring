import { ComponentProps, useState } from 'react'
import styles from './bookcase.module.scss'
import { NormalBookCarrousel } from '../bookCarrousel'
import { ChevronDown, ChevronUp, LucideTrash2 } from 'lucide-react'
import classNames from 'classnames'
import { BookGet } from '@/data/services/livroService'
import { limitText } from '@/data/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Estante } from '@/data/services/estanteService'
import { LoadingDots } from '../loading'
import { GenericModal } from '../modal'

interface BookCaseProps extends ComponentProps<"article"> {
    bookCaseId: number
    title: string
    bookCaseItems?: BookGet[]
    description: string
}





export const BookCase = ({ title, bookCaseId, description }: BookCaseProps) => {
    const [isExpanded, setExpanded] = useState<boolean>(false)
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const queryCliente = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: [`getBooks${bookCaseId}`],
        queryFn: async () => {
            const resp = await Estante.getBooks(Number(bookCaseId))
            return resp;
        },
        enabled: isExpanded
    })

    const bookCaseDelete = useMutation({
        mutationKey: ['deleteBook'],
        mutationFn: async () => {
            const resp = await Estante.deleteEstante(bookCaseId);
            return resp
        },
        onSuccess: () => [
            queryCliente.invalidateQueries({ queryKey: ['getBookCase'] })
        ]
    })


    return (
        <>
            {isOpenModal && <GenericModal title='Voce quer deletar essa estante ?' onCancel={() => setOpenModal(false)} onSubmit={() => [bookCaseDelete.mutateAsync(), setOpenModal(false)]}>
                <small>Ao fazer isso, essa estante não estará mais dissmallonível</small>
            </GenericModal>}
            <article className={classNames(styles.bookcase, { [styles.expanded]: isExpanded })}>
                <header>
                    <div>
                        <h2>{title}</h2>
                        <small>{limitText(description, 100)}</small>
                    </div>
                    <div>
                        <i onClick={() => setOpenModal(true)}><LucideTrash2 /></i>
                        <i onClick={() => setExpanded(!isExpanded)}>{isExpanded ? <ChevronUp /> : <ChevronDown />}</i>
                    </div>
                </header>
                {isExpanded && data && !isLoading &&
                    <NormalBookCarrousel books={data} />}

                {isExpanded && isLoading &&
                    <LoadingDots />}

                {isExpanded && !isLoading && data && data.length < 1 &&
                    <span>Nenhum livro nessa estante</span>
                }
            </article>
        </>
    )
}