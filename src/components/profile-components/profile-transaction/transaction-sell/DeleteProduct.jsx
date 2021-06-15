import { useSelector } from 'react-redux';

const DeleteProduct = ({ productId, setHide }) => {
    const user = useSelector((s) => s.user);

    const handleClick = async (productId) => {
        const ret = await fetch(
            `http://localhost:8080/catalogue/${productId}/product-delete`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
            }
        );
        if (+ret.status === 204) setHide(true);
    };

    return (
        <div className="delete-product">
            <button onClick={() => handleClick(productId)}>BORRAR</button>
        </div>
    );
};

export default DeleteProduct;
