import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { NEODataList } from './NEODataList/NEODataList'
import './App.css'

function App() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [showBackArrow, setShowBackArrow] = useState(false)

    const onDataSelect = () => {
        setShowBackArrow(true)
    }

    const onClickBack = () => {
        setShowBackArrow(false)
        setSelectedDate(null)
    }
    const renderBackArrow = () => {
        return (
            <svg
                id="back-arrow"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                onClick={onClickBack}
            >
                <path
                    fill="currentColor"
                    d="M14.5 5.5L10 10l4.5 4.5L13 16l-6-6 6-6 1.5 1.5z"
                />
            </svg>
        )
    }

    return (
        <div className="App">
            {showBackArrow ? (
                renderBackArrow()
            ) : (
                <div>
                    <span>Select date </span>
                    <DatePicker
                        className="date-picker"
                        onChange={setSelectedDate}
                        selected={selectedDate}
                        dateFormat="yyyy-MM-dd"
                        timeInputLabel="select date"
                    />
                </div>
            )}
            <NEODataList
                date={selectedDate}
                onDataSelect={onDataSelect}
                showDetails={showBackArrow}
            />
        </div>
    )
}

export default App
