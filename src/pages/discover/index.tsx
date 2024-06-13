import { LucideSearch } from 'lucide-react';
import styles from './discover.module.scss';
import { Button } from '@/interface/components/buttons';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { LivroService } from '@/data/services/livroService';
import { LoadingDots } from '@/interface/components/loading';
import { transformBookSearchToBookGet } from '@/data/utils/conversionType';
import { useNavigate } from 'react-router-dom';

export const DiscoverPage = () => {
    const Livro = new LivroService();
    const { register, handleSubmit, getValues } = useForm();
    const navigateTo = useNavigate();


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['getBySearch'],
        queryFn: async () => {
            const response = await Livro.getBySearch(getValues("bookName"));
            return response;
        },
        enabled: false
    });

    const onSubmit = async () => {
        await refetch();
    };


    if (isLoading) {
        return <LoadingDots />;
    }

    return (
        <main className={styles.main}>
            <h1 className={styles['main__title']}>Procure pelo nome do livro, autor ou gênero</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article className={styles.input}>
                    <i><LucideSearch /></i>
                    <input {...register("bookName")} placeholder='Pesquise aqui...' />
                </article>
                <Button type="submit">Pesquisar</Button>
            </form>
            {data && !isLoading &&
                <section className={styles['main__catalog']}>
                    {transformBookSearchToBookGet(data.filter(book => book.imagem && book.imagem.smallThumbnail && book.genero)).map(book => (
                        <article onClick={() =>
                            navigateTo('/readbook',
                                {
                                    state: {
                                        title: book.titulo,
                                        author: book.autor,
                                        img: book.urlCapa,
                                        gen: book.genero,
                                        desc: book.resumo,
                                        pages: book.qtdPagina
                                    }
                                }
                            )
                        }>
                            <img src={book.urlCapa} />
                            <p>{book.titulo}</p>
                        </article>
                    ))}
                </section>
            }
        </main>
    );
};
