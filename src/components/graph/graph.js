import React, { useState, useEffect } from 'react';
import '../../css/graph.css';
import BarGraph from './barGraph.js';
import axios from 'axios';

// `legendItems` array containing gif and color information
const legendItems = [
    { category_id: "666d423e86329950249cafb9", gif: require('../../img/gif/Substract_green.gif'), category: '건강', color: '연두색', className: 'green' },
    { category_id: "666d424286329950249cafba", gif: require('../../img/gif/Substract_yellow.gif'), category: '금전', color: '노랑색', className: 'yellow' },
    { category_id: "666d424586329950249cafbb", gif: require('../../img/gif/Substract_white.gif'), category: '개인', color: '흰색', className: 'white' },
    { category_id: "666d424a86329950249cafbc", gif: require('../../img/gif/Substract_pink.gif'), category: '인간관계', color: '분홍색', className: 'pink' },
    { category_id: "666d424f86329950249cafbd", gif: require('../../img/gif/Substract_purple.gif'), category: '취업', color: '보라색', className: 'purple' },
    { category_id: "666d425186329950249cafbe", gif: require('../../img/gif/Substract_blue.gif'), category: '학업', color: '파란색', className: 'blue' }
];

const App = () => {
    const [worryCounts, setWorryCounts] = useState([]);

    useEffect(() => {
        const fetchWorries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/worries');
                const fetchedWorries = response.data;

                const counts = legendItems.map(item => ({
                    category_id: item.category_id,
                    count: fetchedWorries.filter(worry => worry.category_id === item.category_id).length
                }));

                setWorryCounts(counts);
                console.log(counts);
            } catch (error) {
                console.error('Error fetching worries:', error);
            }
        };

        fetchWorries();
    }, []);

    const totalWorries = worryCounts.reduce((total, item) => total + item.count, 0);
    const values = worryCounts.map(item => (totalWorries > 0 ? (item.count / totalWorries) * 100 : 0));

    return (
        <div className="app-container">
            <div className="graph-container">
                <BarGraph values={values} legendItems={legendItems} totalWorries={totalWorries} />
            </div>
        </div>
    );
};

export default App;
