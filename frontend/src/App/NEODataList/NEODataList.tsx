import React, { useEffect, useState } from 'react'
import { AsteroidsClient, NEOData } from '../../api/AsteroidsClient'
import { NEODataRenderer } from './NeoDataRenderer/NEODataRenderer'
import { GridList } from '../../GridList/GridList'

interface NEODataListProps {
    date: Date | null
    onDataSelect: () => void
    showDetails: boolean
}

const asteroidsClient = new AsteroidsClient()

export const NEODataList = (props: NEODataListProps) => {
    const [list, setList] = useState<Record<string, NEOData[]>>({})
    const [selectedAsteroid, setSelectedAsteroid] = useState<NEOData>()
    useEffect(() => {
        if (props.date == null) {
            setList({})
        }
        asteroidsClient.fetchAsteroidsFeed(props.date).then((res) => {
            setList(res.near_earth_objects)
        })
    }, [props.date])

    const onClickData = (asteroid: NEOData) => () => {
        setSelectedAsteroid(asteroid)
        props.onDataSelect()
    }

    const renderItem = (item?: NEOData) =>
        item ? (
            <NEODataRenderer
                data={item}
                onClick={onClickData(item)}
                showDetails={props.showDetails}
            />
        ) : null
    const renderList = () => (
        <GridList
            items={Object.values(list).flatMap((datalist) => [...datalist])}
            renderItem={renderItem}
        />
    )
    return props.showDetails ? renderItem(selectedAsteroid) : renderList()
}
