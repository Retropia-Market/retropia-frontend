import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import SelectSearch from 'react-select-search';
import LocationSelector from './ProductsComponents/NewSaleComponents/LocationSelector';
import editIcon from '../img/icons/iconmonstr-edit-9.svg';
import { useHistory } from 'react-router';

const UpdateProduct = ({ productId }) => {
    const [showUpdate, setShowUpdate] = useState(false);
    const [status, setStatus] = useState();
    const [price, setPrice] = useState();
    const [location, setLocation] = useState();
    const [description, setDescription] = useState();
    const user = useSelector((s) => s.user);
    const history = useHistory();

    const handleSubmit = async (e, productId) => {
        e.preventDefault();
        const productInfo = {};
        if (status) productInfo['status'] = status;
        if (price) productInfo['price'] = price;
        if (location) productInfo['location'] = location;
        if (description) productInfo['description'] = description;
        console.log(status);

        const ret = await fetch(
            `http://localhost:8080/catalogue/${productId}/update`,
            {
                method: 'PATCH',
                body: JSON.stringify(productInfo),
                headers: {
                    Authorization: 'Bearer ' + user.token,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (ret.status === 200) {
            setShowUpdate(false);
            history.push('/catalogue/' + productId);
        }
    };

    return (
        <div className="update-product">
            <div
                onClick={() => setShowUpdate(!showUpdate)}
                className="update-icon"
                style={{
                    background: `url(${editIcon}) no-repeat`,
                }}
            >
                <editIcon />
            </div>
            {showUpdate && (
                <div className="update-modal">
                    <div
                        className="modal-bg"
                        onClick={() => setShowUpdate(false)}
                    >
                        <form
                            className="modal-fg"
                            onSubmit={(e) => handleSubmit(e, productId)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="update-title">
                                <FormattedMessage id="update.title" />
                            </h3>
                            <div className="update-inputs">
                                <label>
                                    <FormattedMessage id="sale.productPrice" />
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />
                                </label>
                                <label>
                                    <FormattedMessage id="sale.productDescrip" />
                                    <textarea
                                        cols="30"
                                        rows="10"
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </label>
                                <label>
                                    <FormattedMessage id="sale.productStatus" />
                                    <SelectSearch
                                        options={[
                                            { value: 'Nuevo', name: 'Nuevo' },
                                            {
                                                value: 'usado como nuevo',
                                                name: 'Usado - Como nuevo',
                                            },
                                            { value: 'usado', name: 'Usado' },
                                            {
                                                value: 'deteriorado',
                                                name: 'Deteriorado',
                                            },
                                            {
                                                value: 'recambio',
                                                name: 'Recambio',
                                            },
                                        ]}
                                        search
                                        placeholder="Nombre"
                                        onChange={setStatus}
                                    />
                                </label>
                                <label>
                                    <FormattedMessage id="sale.productLoc" />
                                    <LocationSelector
                                        setProductLocation={setLocation}
                                    />
                                </label>

                                <button className="update-button">
                                    <FormattedMessage id="update.button" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;
