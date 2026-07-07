import Item from './Item';

const ItemList = ({ products }) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {products.map(prod => <Item key={prod.id} {...prod} />)}
        </div>
    );
};

export default ItemList;
