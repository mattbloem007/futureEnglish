import React from "react"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"
import "typeface-roboto"
import "./style.css"

import { LayoutModal } from "./LayoutModal"

export const Layout = ({ children, navigation }) => {
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? (
          <LayoutModal closeTo={closeTo} navigation={navigation}>
            {children}
          </LayoutModal>
        ) : null
      }
    </ModalRoutingContext.Consumer>
  )
}
