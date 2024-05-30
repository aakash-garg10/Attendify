'use client'
import React, { useEffect, useState } from 'react'
import { Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

//PERCENTEAGES ARE NOT ACCURATE
const PieChartComponent = ({ attendanceList }) => {
    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();

        attendanceList?.forEach((item) => {
            if (!existingUser.has(item.studentId)) {
                uniqueRecord.push(item);
                existingUser.add(item.studentId);
            }
        });
        return uniqueRecord;
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        const uniqueStudents = getUniqueRecord();
        const percentage = ( (uniqueStudents.length)/6) * 100; //formula is incorrect
        setData([
            {
                name: "Total present",
                value: percentage,
                fill:"#8884d8"
            },
            {
                name: "Total absent",
                value: 100 - percentage,
                fill:"#aF8042"
            }
        ])
    }, [attendanceList]);
   
    return (
        <div>
            <ResponsiveContainer width={'100%'} height={300}>
                <h2 className='text-2xl text-center'>Monthly Attendance</h2>
                <PieChart width={1000} height={300}>
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={80} label />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent