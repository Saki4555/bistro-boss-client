import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import orderCoverImg from '../../assets/shop/banner2.jpg';
import Cover from '../Shared/Cover/Cover';
import { useState } from 'react';
import useMenu from '../../Hooks/useMenu';
import OrderTab from './OrderTab/OrderTab';
import { useParams } from 'react-router-dom';





const Order = () => {

    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const { category } = useParams();

    const initailIndex = categories.indexOf(category);

    const [tabIndex, setTabIndex] = useState(initailIndex);

  
    console.log(category);

    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');
    return (
        <div className='mb-4'>
            <div className='mb-4 w-full'>
                <Cover img={orderCoverImg} title='Order Food'></Cover>
            </div>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='text-center'>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert} />
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;