import React from 'react'
import { useObservable } from 'rxjs-hooks'
import { visualisationQuery } from '../../../store/visualisation/visualisation.query'
import { Wall } from '../components/Wall'

interface WallsProps {}

export const Walls: React.FC = () => {
  const config = useObservable(() => visualisationQuery.state$)

  console.log({ config })
  return <Wall />
}
