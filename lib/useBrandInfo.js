import { useEffect, useState } from "react"
import DirectusSource from "./directus"

const useBrandInfo = () => {
  const [ infoBrand, setAllNews ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(false)

  const name = `site${process.env.NEXT_PUBLIC_SITE}`

  const filters = {
    fields: ['logo', 'title', 'name'],
    filter: {
      status: "published",
      name
    }
  }

  const getInfoBrand = async () => {

    setLoading(true);
    setError(false);

    try {
      const publicData = await DirectusSource.items(process.env.NEXT_PUBLIC_MODEL_BRAND).readByQuery({ ...filters })
      setAllNews({...publicData.data[0]})
      setLoading(false)
      setError(false);
    } catch (e) {
      setLoading(false)
      setError(true);
      setAllNews(null)
    }

  }

  useEffect(() => {
    getInfoBrand()
  }, [])

  return {
    infoBrand,
    loading,
    error
  }
}

export default useBrandInfo