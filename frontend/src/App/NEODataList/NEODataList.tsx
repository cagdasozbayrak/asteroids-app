import React, { useEffect, useState } from 'react'
import { AsteroidsClient, NEOData } from '../../api/AsteroidsClient'
import { NEODataRenderer } from './NeoDataRenderer/NEODataRenderer'
import { GridList } from '../../GridList/GridList'
import { Loading } from '../../Loading/Loading'
import './neoDataList.css'

interface NEODataListProps {
    date: Date | null
    onDataSelect: () => void
    showDetails: boolean
}

const asteroidsClient = new AsteroidsClient()

export const NEODataList = (props: NEODataListProps) => {
    const [list, setList] = useState<Record<string, NEOData[]>>({})
    const [selectedAsteroid, setSelectedAsteroid] = useState<NEOData>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (props.date == null) {
            setList({})
            return
        }
        setLoading(true)
        asteroidsClient.fetchAsteroidsFeed(props.date).then((res) => {
            setList(res.near_earth_objects)
            setLoading(false)
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

    if (isLoading) {
        return <Loading id="loading" size={100} color="dddd" />
    }
    return props.showDetails ? renderItem(selectedAsteroid) : renderList()
}
