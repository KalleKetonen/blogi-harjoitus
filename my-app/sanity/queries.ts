// Kaikki GROQ-queryt yhdessä paikassa
// Tämä helpottaa ylläpitoa — muutat hakua yhdestä kohdasta

// Uusin postaus sisältöineen — näytetään blogilistan pääalueella
export const latestPostQuery = `*[_type == "post"] | order(publishedAt desc)[0] {
  title,
  slug,
  excerpt,
  publishedAt,
  content
}`

// Seuraavat 5 vanhempaa postausta — näytetään sivupalkissa
// [1...6] tarkoittaa indeksit 1,2,3,4,5 eli 5 kpl uusimmasta alkaen
export const olderPostsQuery = `*[_type == "post"] | order(publishedAt desc)[1...6] {
  _id,
  title,
  slug,
  excerpt,
  publishedAt
}`

// Kaikki postaukset sivupalkkia varten — vain otsikko, slug ja päivämäärä
export const allPostsSidebarQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt
}`

// Yksi postaus slug-parametrin perusteella
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  title,
  publishedAt,
  content
}`
