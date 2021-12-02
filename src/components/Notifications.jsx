// // import React from 'react';
// // import { useGetCryptosQuery } from '../services/cryptoApi';


// import React, { useEffect, useState } from 'react';
// import millify from 'millify';
// import { Link } from 'react-router-dom';
// import { Card, Row, Col, Input } from 'antd';

// import { useGetCryptosQuery } from '../services/cryptoApi';
// import Loader from './Loader';

// const Notifications = ({ simplified }) => {

//     const count = simplified ? 10 : 100;
//     const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
//     const [cryptos, setCryptos] = useState();
//     const [searchTerm, setSearchTerm] = useState('');
  
//     if (isFetching) return <Loader />;


//     // return (
//     //     <>
//     //     <div className="notification">


//     //         {
//     //         cryptos?.map((currency.change) => (
//     //             <Link key={currency.id} to={`/crypto/${currency.id}`}>
              
//     //                 <p>Daily Change: {currency.change}%</p>
//     //             </Link>
//     //         ))
//     //         }


//     //     </div>
//     //     </>
//     // );

//     return (
//         <>
         
//           <Row gutter={[32, 32]} className="crypto-card-container">
//             {cryptos?.map((currency) => (
//               <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
//                 <Link key={currency.id} to={`/crypto/${currency.id}`}>
//                   <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} />} hoverable>
//                     <p>Price: {millify(currency.price)}</p>
//                     <p>Market Cap: {millify(currency.marketCap)}</p>
//                     <p>Daily Change: {currency.change}%</p>
//                   </Card>
//                 </Link>
//               </Col>
//             ))}
//           </Row>
//         </>
//       );
// }

// export default Notifications

import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Notifications = ({simplified}) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  const maxChange = new Map();
  const maxName = new Map();
  const maxId = new Map();
//   let cryptoName = new Map([...maxChange.entries()].map(
//     ([key, value]) => ([value, key]))
//   );

  var green = {
    backgroundColor: 'green',
  };
  var red = {
    backgroundColor: 'red',
    marginTop: '60px',
  };

  let currenciesPos;
  let currenciesIncrease;
  let currenciesIncreaseName;

  return (
    <>
 
        {cryptos?.map((currency) => (
            maxChange.set(currency.name, currency.change),
            console.log(maxChange),

            maxName.set(currency.change, currency.name),
            maxId.set(currency.change, currency.id),
            console.log(maxId),
            
            currenciesIncrease = Math.max(...maxChange.values()),
            console.log("currencies Icrease " + currenciesIncrease),
    
            currenciesIncreaseName = maxName.get(Math.max(...maxChange.values())),
            console.log("currencies Increase Name " + currenciesIncreaseName),

            currenciesPos = maxId.get(Math.max(...maxChange.values())),
            console.log("test1 " + currenciesPos),
            console.log("test2 " + currency.id)
        ))} 

       
             {/* <div className="notification" style={red} hoverable>
                 {test.get(Math.min(...maxChange.values()))} {Math.min(...maxChange.values())}%
             </div> */}


            <Link key={currenciesPos} to={`/crypto/${currenciesPos}`}>
                <div className="notification" style={green} hoverable>
                    {currenciesIncreaseName} {currenciesIncrease}%
                </div>
            </Link>


    </>
  );
};

export default Notifications;
