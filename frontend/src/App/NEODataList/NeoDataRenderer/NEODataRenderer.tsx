import React, { useEffect, useState } from 'react'
import { NEOData } from '../../../api/AsteroidsClient'
import { JSONTree } from 'react-json-tree'
import './neoDataRenderer.css'

interface NEODataProps {
    data: NEOData
    onClick: () => void
    showDetails: boolean
}

export const NEODataRenderer = (props: NEODataProps) => {
    const { data, onClick, showDetails } = props
    const [maxMissDistance, setMaxMissDistance] = useState<number>(-1)

    useEffect(() => {
        // sort in increasing order and use the first one
        const missDistance = Math.max(
            ...props.data.close_approach_data.map(
                (cad) => cad.miss_distance.lunar
            )
        )
        setMaxMissDistance(missDistance)
    }, [props.data])

    const renderDetail = () => <JSONTree data={data} />

    const renderData = () => (
        <div className="neo-data" onClick={onClick}>
            <div className="neo-name">{`Name: ${data.name}`}</div>
            <div className="neo-miss-distance">{`Miss distance: ${maxMissDistance.toFixed(
                2
            )} LD`}</div>
        </div>
    )

    if (showDetails) {
        return renderDetail()
    }

    return renderData()
}
