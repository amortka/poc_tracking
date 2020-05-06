import React from 'react'
import { Visualisation } from '../../../models/main.model'
import { Wall } from '../components/Wall'

interface WallsProps {
  config: Visualisation
}

export const Walls: React.FC = () => {
  return <Wall />
}
