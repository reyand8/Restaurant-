import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Button, Row, Col, Form, Input} from 'antd'
import { useEffect } from 'react'
import {fetchOne, save} from '../../store/actions/waiter'
import {selectWaiterEdit} from "../../store/selectors";
import '../../App.css'
const PHONE_TEMPLATE = /^\d{3}-\d{2}-\d{2}$/

export default function ContactForm () {
    const waiterEdit = useSelector(selectWaiterEdit)
    let { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (id && !waiterEdit?.id) {
            dispatch(fetchOne(id))
        }
    }, [dispatch, id, waiterEdit?.id])

    function onFinish (value) {
        const waiter = {
            ...waiterEdit,
            ...value,
        }
        dispatch(save(waiter))
        navigate('/waiters')
    }

    if (id && !waiterEdit?.id) {
        return <div>Loading...</div>
    }

    return (
        <Row justify='center'>
            <Col span={6}>
                <Form
                    name="basic"
                    labelCol={{ span: 6, }}
                    wrapperCol={{ span: 14, }}
                    style={{ maxWidth: 800, marginTop: '80px'}}
                    autoComplete="off"
                    initialValues={waiterEdit}
                    onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="firstName"
                        rules={[
                            {
                                min: 4,
                                message: 'Your name must be longer than 3 symbols!',
                            },
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone"
                               rules={[
                                   {
                                       pattern: PHONE_TEMPLATE,
                                       message: 'The format must be 000-00-00!',
                                   },
                                   {
                                       required: true,
                                       message: 'Please input your phone!',
                                   },
                               ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item justify='center'
                        wrapperCol={{ offset: 5, span: 10}}>
                        <Button className='button-style' htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}