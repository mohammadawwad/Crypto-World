import React, {useState} from 'react'
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import {useGetNewsQuery} from '../services/newsApi';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const {Text, Title} = Typography;
const {Option} = Select;
const demoImageUrl = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

export const News = ({simplified}) => {
    const [newsCatagory, setNewsCatagory] = useState('Crypto Currency');
    const {data: cryptoNews} = useGetNewsQuery({newsCatagory, count: simplified ? 6 : 12});
    const {data} = useGetCryptosQuery(100);

    if(!cryptoNews?.value) return <Loader/>;

    return (
        <div>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        classNAme="select-news"
                        placeholder="Select a News"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCatagory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Crypto Currencies">Crypto Currencies</Option>
                        {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            <Row gutter={[24,24]}>
                {cryptoNews.value.map((news, i) =>(
                    <Col xs={24} sm={12} lg={8} key={1}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Title className="news-title" level={4}>
                                        {news.name}
                                    </Title>
                                    <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news"/>
                                </div>
                                <p>
                                    {news.description >100 ? `${news.description.substring(0,100)}...` : news.description}
                                </p>
                                <div className="provider-container">
                                    <div>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt="news"/>
                                        <Text className="provide-name">
                                            {news.provider[0]?.name}
                                        </Text>
                                    </div>
                                    <Text>
                                        {moment(news.datePublished).startOf('ss').fromNow()}
                                    </Text>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default News;