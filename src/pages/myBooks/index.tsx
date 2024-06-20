import { BookCase } from '@/interface/components/bookcase'
import styles from './myBooks.module.scss'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Estante } from '@/data/services/estanteService'
import { LoadingDots } from '@/interface/components/loading'
import { GenericCard } from '@/interface/components/genericCard'
import { Button } from '@/interface/components/buttons'
import { useForm } from 'react-hook-form'


export const MyBooksPage = () => {

    const { register, getValues, reset } = useForm();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getBookCase'],
        queryFn: async () => {
            const response = await Estante.getAll();
            return response
        }
    })

    const bookCase = useMutation({
        mutationKey: ['newBookCase'],
        mutationFn: async () => {
            const response = await Estante.postBookCase({ nome: getValues("nome"), descricao: getValues("descricao") })
            return response;
        },
        onSuccess: () => {
            refetch();
            reset();
        }
    })

    // const deleteBookCase = useMutation({
    //     mutationKey: ['deleteBookCase'],
    //     mutationFn: async () => {
    //         const response = await Estante.deleteEstante(3);
    //         console.log(response)
    //         return response;
    //     },
    //     onSuccess: () => {
    //         refetch();
    //         reset();
    //     }
    // })

    if (isLoading || bookCase.isPending) {
        return <main><LoadingDots /> </main>
    }

    return (
        <main className={styles.main}>
            {data &&
                <>
                    <section className={styles['main__bookCases']}>
                        {data.map((bookCase, index) => (
                            <BookCase key={index} bookCaseId={bookCase.id} description={bookCase.descricao} title={bookCase.nome} />
                        ))}
                    </section>
                    <section className={styles['main__rightContent']}>
                        <GenericCard title='Nova Estante'>
                            <form onSubmit={(e) => [e.preventDefault(), bookCase.mutateAsync()]} className={styles['main__newBookCase']}>
                                <fieldset>
                                    <label>Nome</label>
                                    <input {...register("nome")} required minLength={3} name='nome' placeholder='Ex: "Comédia"' />
                                </fieldset>
                                <fieldset>
                                    <label>Descricao</label>
                                    <textarea {...register("descricao")} required minLength={10} name='descricao' placeholder='Ex: "Essa estante são para livros de comédia que desejo ler"' />
                                </fieldset>
                                <div>
                                    <Button>Enviar</Button>
                                </div>
                            </form>
                        </GenericCard>
                    </section>
                </>}
        </main>
    )
}