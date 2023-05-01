import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { NEODataList } from './NEODataList/NEODataList'
import './App.css'

function App() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    return (
        <div className="App">
            <DatePicker
                className="date-picker"
                onChange={setSelectedDate}
                selected={selectedDate}
                dateFormat="yyyy-MM-dd"
            />
            <NEODataList date={selectedDate} />
        </div>
    )
}

export default App
