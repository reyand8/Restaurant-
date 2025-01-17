import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import { Input, Tag, theme } from 'antd';
import {useSelector} from 'react-redux';

import {selectDishEdit} from '../../store/selectors';


const DishFormTags = () => {
    const { token } = theme.useToken();
    const dishEdit = useSelector(selectDishEdit);
    const dishTags = dishEdit.tags.split(' ').map((tag) => {return tag;});
    const [tags, setTags] = useState(dishTags);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const forMap = (tag) => {
        const tagElem = (
            <Tag color="cyan" closable onClose={(e) => {
                e.preventDefault();
                handleClose(tag);}}>
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{display: 'inline-block'}}>
                {tagElem}
            </span>
        );
    };

    const tagChild = tags.map(forMap);

    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    return (
        <>
            <div style={{marginBottom: 16}}>
                <TweenOneGroup enter={{
                    scale: 0.8,
                    opacity: 0,
                    type: 'from',
                    duration: 100,
                }}
                onEnd={(e) => {
                    if (e.type === 'appear' || e.type === 'enter') {
                        e.target.style = 'display: inline-block';
                    }
                }}
                leave={{
                    opacity: 0,
                    width: 0,
                    scale: 0,
                    duration: 200,
                }}
                appear={false}
                >
                    {tagChild}
                </TweenOneGroup>
            </div>
            {inputVisible ? (
                <Input
                    ref={inputRef}
                    type="text"
                    size="small"
                    style={{
                        width: 78,
                    }}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            ) : (
                <Tag onClick={showInput} style={tagPlusStyle}>
                    <PlusOutlined /> New Tag
                </Tag>
            )}
        </>
    );
};

export default DishFormTags;