import React, { useEffect, useState } from 'react'
import { AsteroidsClient, NEOData } from '../../api/AsteroidsClient'
import { NEODataRenderer } from './NeoDataRenderer/NEODataRenderer'
import { GridList } from '../../GridList/GridList'

interface NEODataListProps {
    date: Date | null
}

const asteroidsClient = new AsteroidsClient()

export const NEODataList = (props: NEODataListProps) => {
    const [list, setList] = useState<Record<string, NEOData[]>>({})
    const [selectedAsteroid, setSelectedAsteroid] = useState<NEOData>()
    useEffect(() => {
        asteroidsClient.fetchAsteroidsFeed(props.date).then((res) => {
            setList(res.near_earth_objects)
        })
    }, [props.date])

    const onClickData = (asteroid: NEOData) => () =>
        setSelectedAsteroid(asteroid)

    const renderItem = (item: NEOData) => (
        <NEODataRenderer
            data={item}
            onClick={onClickData(item)}
            showDetails={selectedAsteroid != null}
        />
    )
    const renderList = () => (
        <GridList
            items={Object.values(list).flatMap((datalist) => [...datalist])}
            renderItem={renderItem}
        />
    )
    return selectedAsteroid ? renderItem(selectedAsteroid) : renderList()
}
