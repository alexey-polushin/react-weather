import React from 'react'
import { Grid, Row } from 'react-flexbox-grid'

import { SearchForm, Cities } from 'containers'
import { Block } from 'components'

const HomePage = () => {
  return (
    <Block className="container">
      <Grid>
        <SearchForm />
        <Row className="cities">
          <Cities />
        </Row>
      </Grid>
    </Block>
  )
}

export default HomePage
