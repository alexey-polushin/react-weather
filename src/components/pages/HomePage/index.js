import React from 'react'

import { SearchForm, Cities } from 'containers'

const HomePage = () => {
  return (
    <div className="container">
      <SearchForm />
      <Cities />
    </div>
  )
}

export default HomePage
