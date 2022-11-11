import * as React from 'react';
import {useEffect, useState} from 'react';
import {Box, Button, Divider, Modal, TextareaAutosize, Typography} from '@mui/material';
import styles from './_modal.module.scss'
import axios from "axios";


export default function JsonModal({open, onClose, data, id}) {
    const [textAreaOpen, setTextAreaOpen] = useState(true);
    const handleTextArea = () => setTextAreaOpen(!textAreaOpen);
    const [json, setJson] = useState();
    const API = `http://localhost:3000/api/${id.toLowerCase()}`;

    useEffect(() => {
        setJson(data);
    }, [data])

    /**
     * 수정한 json을 저장한다.
     * 만약 수정 버튼이 활성화돼있다면 alert를 통해 수정 버튼을 비활성화 유도한다.
     * @returns {Promise<void>}
     */
    const save = async () => {
        if (isOpen(textAreaOpen)) {
            alert("수정을 비활성화해주세요.");
        } else {
            // axios는 값을 object 형태로 감싸서 서버로 보내기에 content-type을 text로 지정해 그대로 넘기게 변경
            await axios.put(API, json, {
                "headers": {
                    "content-type": "application/text",
                },
            });
        }
    }

    const isOpen = (open) => {
        return open === false;
    }

    // 모달창 꺼지면 수정 비홯성화
    if (open === false && textAreaOpen === false) {
        setTextAreaOpen(true);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className={styles.modal}
            >
                <Box className={styles.box}>
                    <Typography className={styles.title}>
                        JSON 수정
                    </Typography>
                    <Divider className={styles.divider}/>
                    <Box className={styles.boxArea}>
                        <TextareaAutosize
                            className={styles.textArea}
                            disabled={textAreaOpen}
                            minRows={4}
                            defaultValue={data}
                            onChange={(e) => setJson(e.target.value)}
                        />
                    </Box>
                    <Divider className={styles.divider}/>
                    <Box className={styles.boxArea}>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={handleTextArea}
                            className={styles.mL}
                        >
                            수정
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={save}
                            className={styles.mL}
                        >
                            저장
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}