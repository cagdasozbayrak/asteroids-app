import React from 'react'
import './gridList.css'

interface GridListProps<T> {
    items: T[]
    renderItem: (item: T, index: number) => React.ReactNode
}

export const GridList = <T,>(props: GridListProps<T>) => {
    const { items, renderItem } = props
    return (
        <div className="grid-list">
            {items.map((item, index) => (
                <div className="grid-list-item" key={index}>
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    )
}
