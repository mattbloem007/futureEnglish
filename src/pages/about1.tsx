  import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import { useModal } from "../services"
import { Layout } from "../components/layouts/Layout"

export default props => {

  const { modal } = useModal()

  return (
    <Layout >
      <article className={modal && "max-h-80vh md:max-h-90vh overflow-auto"}>
        <div className={modal ? "p-4 lg:p-8" : "container py-8"}>
          <h1 className="text-2xl lg:text-3xl text-blue-500 font-bold leading-tight">
            Hello
          </h1>
        </div>
      </article>
    </Layout>
  )
}
