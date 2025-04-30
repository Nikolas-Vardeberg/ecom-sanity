import { groq } from "next-sanity";

export const PRODUCT_QUERY = groq`*[_type == "product"] {
    ...,
}`

export const PRODUCT_SLUG_QUERY = groq`*[_type == "product" && slug.current == $slug][0] {
    ...,
}`