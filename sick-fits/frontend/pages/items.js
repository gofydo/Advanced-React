import Items from '../components/Items'

const Shop = (props) => {
    return <Items page={parseFloat(props.query.page) || 1}/>;
}

export default Shop;
