import React, { useState, useEffect, useRef } from 'react';
import '../../css/recode.css';
import img from '../../img/image.png';
import CategoryList from './categoryList.js';
import TextBoxContainer from './textBoxContainer.js';
import Modal from './modal.js';
import { categoryData, textBoxes } from './Data/data.js';

const App = () => {
    const [selected, setSelected] = useState({ category: '건강', color: 'green' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTextBox, setSelectedTextBox] = useState(null);
    const textBoxesRef = useRef([]);
    const containerRef = useRef(null);
    const selectedChange = selected;

    useEffect(() => {
        positionTextBoxes();
    }, [selected]);

    useEffect(() => {
        textBoxesRef.current = [];
    }, [selected]);

    const positionTextBoxes = () => {
        const boxes = textBoxesRef.current.filter(Boolean);
        const container = containerRef.current;

        if (!container || boxes.length === 0) return;

        const columns = 3; // 열 개수
        const columnHeights = Array(columns).fill(0);
        const columnWidth = (container.offsetWidth - (columns - 1) * 40) / columns;

        boxes.forEach(box => {
            const minHeight = Math.min(...columnHeights);
            const column = columnHeights.indexOf(minHeight);
            const x = column * (columnWidth + 40);
            const y = minHeight;

            if (box) {
                box.style.transform = `translate(${x}px, ${y}px)`;
                columnHeights[column] += box.offsetHeight + 40;
            }
        });

        container.style.height = `${Math.max(...columnHeights)}px`;
    };

    const openModal = (textBox) => {
        setIsModalOpen(true);
        setSelectedTextBox(textBox);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTextBox(null);
    };

    return (
        <div className='main' style={{ boxShadow: isModalOpen ? 'inset' : '' }}>
            <div className={`container ${isModalOpen ? 'modal-open' : ''}`}>
                <div className='div'>
                    <CategoryList
                        selected={selected}
                        setSelected={setSelected}
                        categoryData={categoryData}
                        textBoxes={textBoxes}
                    />
                    <TextBoxContainer
                        selected={selected}
                        textBoxes={textBoxes}
                        categoryData={categoryData}
                        textBoxesRef={textBoxesRef}
                        containerRef={containerRef}
                        openModal={openModal}
                    />
                </div>
            </div>
            {isModalOpen && selectedTextBox && (
                <>
                    <div className="modal-overlay" onClick={closeModal}></div>
                    <Modal
                        selectedTextBox={selectedTextBox}
                        closeModal={closeModal}
                        img={img}
                    />
                </>
            )}
        </div>
    );
};

export default App;