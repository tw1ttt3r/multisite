import Image from "next/image"
import useNews from "../lib/useNews"

export default function Home() {

  const { allNews, loading, error } = useNews()
  
  return (
    <>
      { !!loading && <h1>Cargando...</h1> }
      { !!error && <h1>Upss...</h1> }
      { !!allNews?.length && allNews.map( (item, i) => <div key={`new_${i}`}>
        <h1>{ item.tile }</h1>
        <Image src={`${process.env.NEXT_PUBLIC_SOURCE}${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}${item.main_image}`} alt="image_msg" width={300} height={300} />
        <p>{item.abstract}</p>
        <p>{item.slug}</p>
      </div> ) }
      { !allNews?.length && <h1>Ninguna noticia disponible... </h1> }
    </>
  )
}
