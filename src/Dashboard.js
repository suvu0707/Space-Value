import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';

/**
 * Dashboard component to display space mission data.
 * @param {Object} props - Component props.
 * @param {boolean} props.isLoggedIn - Indicates whether the user is logged in.
 * @param {Function} props.setLoggedIn - Function to set the login status.
 */

const Dashboard = ({ isLoggedIn, setLoggedIn }) => {
    const [rowData, setRowData] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
            .then((response) => response.json())
            .then((data) => setRowData(data));

        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        setUsername('');
        setLoggedIn(false);

        localStorage.removeItem('username');

        navigate('/login');
    };

    const pieData = React.useMemo(
        () => [
            { label: 'Successful', data: rowData.filter((mission) => mission.successful === true).length },
            { label: 'Failed', data: rowData.filter((mission) => mission.successful === false).length },
        ],
        [rowData]
    );

    const COLORS = ['#0088FE', '#FF8042'];

    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${pieData[index].label}-${value}`}
            </text>
        );
    };

    const columnDefs = [
        { headerName: 'Mission Name', field: 'mission', sortable: true, filter: true },
        { headerName: 'Launch Company', field: 'company', sortable: true, filter: true },
        { headerName: 'Location', field: 'location', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', sortable: true, filter: true },
        { headerName: 'Time', field: 'time', sortable: true, filter: true },
        { headerName: 'Rocket Type', field: 'rocket', sortable: true, filter: true },
        { headerName: 'Price', field: 'price', sortable: true, filter: true },
        { headerName: 'Mission Outcome', field: 'successful', sortable: true, filter: true },
    ];

    const pieChartWidth = 700;
    const pieChartHeight = 500;

    return (
        <div data-testid="dashboard" className="dashboard-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="dashboard-title">SpaceVue Dashboard</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <h3 style={{ marginRight: '10px' }}>{`Welcome, ${username}!`}</h3>
                    <button className="logout-button" type="button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            {isLoggedIn ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="ag-theme-alpine" style={{ height: '550px', width: '60%', marginBottom: '20px' }}>
                        <AgGridReact  columnDefs={columnDefs} rowData={rowData} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3>PieChart Title</h3>
                        <PieChart width={pieChartWidth} height={pieChartHeight}>
                            <Pie data={pieData} dataKey="data" nameKey="name" outerRadius={250} fill="#8884d8" label={renderLabel}>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>
            ) : (
                <p className="error-message">Please log in to access the dashboard.</p>
            )}
        </div>
    );
};

Dashboard.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
};

export default Dashboard;
