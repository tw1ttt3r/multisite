import { useEffect, useState } from "react"
import DirectusSource from "./directus"

const useNews = () => {
  const [ allNews, setAllNews ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)

  // const site = Array.from(new Set([ '0', process.env.NEXT_PUBLIC_SITE ]))

  const filters = {
    fields: ['title', 'slug', 'abstract', 'main_image'],
    filter: {
      status: "published",
      site: process.env.NEXT_PUBLIC_SITE
    }
  }

  console.log("filters", filters)

  const getAllNews = async () => {

    setLoading(true);
    setError(false);

    try {
      const publicData = await DirectusSource.items(process.env.NEXT_PUBLIC_MODEL_DATA).readByQuery({ ...filters })
      console.log("publicData", publicData)
      setAllNews([...publicData.data])
      setLoading(false)
      setError(false);
    } catch (e) {
      setLoading(false)
      setError(true);
      setAllNews(null)
    }

  }

  useEffect(() => {
    getAllNews()
  }, [])

  return {
    allNews,
    loading,
    error
  }
}

export default useNews