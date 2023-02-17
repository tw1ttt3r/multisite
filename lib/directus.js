import { Directus } from "@directus/sdk"

const DirectusSource = new Directus(process.env.NEXT_PUBLIC_SOURCE);

export default DirectusSource;