import * as React from 'react'

const TableHero = ({ owner }: { owner: string }) => {
  return (
    <section className="hero">
      <h1>Hosted by {owner}</h1>
    </section>
  )
}

export default TableHero