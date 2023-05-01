import React, { useEffect, useState } from 'react'
import { NEOData } from '../../../api/AsteroidsClient'
import { JSONTree } from 'react-json-tree'

interface NEODataProps {
    data: NEOData
    onClick: () => void
    showDetails: boolean
    loading?: boolean
}

export const NEODataRenderer = (props: NEODataProps) => {
    const { data, onClick, showDetails, loading } = props
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

    const renderLoading = () => <div>loading</div>

    const renderDetail = () => <JSONTree data={data} />

    const renderData = () => (
        <div className="neo-data" onClick={props.onClick}>
            <div className="neo-name">{`Name: ${data.name}`}</div>
            <div className="neo-miss-distance">{`Miss distance: ${maxMissDistance} LD`}</div>
        </div>
    )

    if (loading) {
        return renderLoading()
    }
    if (showDetails) {
        return renderDetail()
    }

    return renderData()
}
