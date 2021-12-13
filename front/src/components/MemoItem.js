import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import * as TiIcons from "react-icons/ti";
import * as usersAPI from '../api/users'; 
import { Rnd } from 'react-rnd';
import ImageUploading from 'react-images-uploading';

const Remove = styled.div`
    position:absolute;
    bottom: 0;
    right: 1px;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
    color: #ff6b6b;
    }
`;

const Edit = styled.div`
    position:absolute;
    bottom: 0;
    right: 26px;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
    color: #ff6b6b;
    }
`;

const ImageUpload = styled.div`
    position:absolute;
    bottom: 0;
    right: 51px;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
    color: #ff6b6b;
    }
`;

const MemoItemBlock = {
    listStyle: "none",
    zIndex: 2,
    float: "left",
    margin: "10px",
    padding: "10px 10px 10px 10px",
    display: "block",
    border: "1px solid #bfbfbf",
    backgroundColor:  "LightGoldenRodYellow",
    color: "black",
};

const Text = styled.div`
    flex: 1;
    font-size: 15px;
    color: #495057;

`;

const TextArea = {
    width: "98%",
    height: "85%",
    resize: "none"
};




function MemoItem(props) {
    const boxRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const [position, setPosition] = useState({
        x: 20,
        y: 20,
        width: 150,
        height: 150,
    });


    const onResize = (event, direction, ref, delta) =>{
        const { width, height } = ref.style;
    
        setPosition(prevPosition => ({
        ...prevPosition,
        width,
        height
        }));
        console.log(width, height);
        console.log(position);
    };
    
    const onDragStop = (e, d) =>{
        const { x, y } = d;
        setPosition(prevPosition => ({
        ...prevPosition,
        x,
        y
        }));
        console.log(x, y);
        console.log(position);
    }



    const [edited, setEdited] = useState(false);
    const [newText, setNewTest] = useState(props.text);
    const editInputRef = useRef(null);

    useEffect(() => { 
        if (edited) { 
            editInputRef.current.focus(); 
        } 
    }, [edited]);

    const onChangeEditInput = (e) => { 
        setNewTest(e.target.value); 
    };

    const onEdit = () => {
        setEdited(true);
    };

    const editMemo = () => {
        const Data = {
            user: props.userId, 
            id: props.id,
            memo: newText
        }
        console.log(Data);
        usersAPI.editMemo(Data);
    };

    const onEditComp = () => {
        editMemo();
        setEdited(false);
        let x = props.test + 1;
        props.setTest(x);
    };

    const onRemove = () => {
        const Data = {
            user: props.userId,
            id: props.id
        }
        console.log(props);
        console.log(Data);
        
        usersAPI.deletetMemo(Data);
        let x = props.test + 1;
        props.setTest(x);
    }

    const [images, setImages] = useState([]);
    const maxNumber = 3;
    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <Rnd
            style={MemoItemBlock}
            default={{
                x: 20,
                y: 20,
                width: 150,
                height: 150,
            }}
            onResize={onResize}
            onDragStop={onDragStop}
            minWidth={150}
            minHeight={150}
            bounds="window"
        >
            
        {edited ? (
            <textarea
                value={newText} 
                ref={editInputRef} 
                onChange={onChangeEditInput} 
                style={TextArea}
            />

        ) :
        (
            <Text >{props.text}</Text>
        )

        }

        <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div 
            style={{
            flexDirection: "raw",
            width: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            }}>
            <ImageUpload
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              <BsIcons.BsFillImageFill/>
            </ImageUpload>
            {imageList.map((image, index) => (
              <div key={index}>
                <img src={image['data_url']} alt="" width="100" />
                <div>
                  {/*<button onClick={() => onImageUpdate(index)}>수정</button>*/}
                  <TiIcons.TiDelete onClick={() => onImageRemove(index)} />
                </div>
              </div>
            ))}
          </div>
        )}
        </ImageUploading>


        {edited ? (
                <Edit onClick={onEditComp}>
                    <AiIcons.AiOutlineEdit />
                </Edit>
            ) :
            (
                <Edit onClick={onEdit}>
                    <AiIcons.AiFillEdit />
                </Edit>
            )
        }
        <Remove onClick={onRemove}>
            <MdIcons.MdDelete />
        </Remove>
        </Rnd>
    );
}

export default MemoItem;