import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import SelectSearch from 'react-select-search';
import LocationSelector from './ProductsComponents/NewSaleComponents/LocationSelector';
import editIcon from '../img/icons/iconmonstr-edit-9.svg';
import { useHistory } from 'react-router';

import checkIcon from '../img/icons/check.svg';
import cancelIcon from '../img/icons/cancel.svg';

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
        if (price)
            productInfo['price'] =
                price.indexOf(',') !== -1
                    ? Number(price.replace(/,/, '.'))
                    : +price;
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
                            <div className="update-title">
                                <FormattedMessage id="update.title" />
                            </div>
                            <div className="update-inputs">
                                <label>
                                    <FormattedMessage id="sale.productPrice" />
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                        className="normal-input"
                                        pattern="^\d+(,\d{1,2})?$"
                                    />
                                </label>
                                <label>
                                    <FormattedMessage id="update.productDescrip" />
                                    <textarea
                                        cols="30"
                                        rows="8"
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className="textarea-input"
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

                                <div className="delete-inputs">
                                    <button
                                        className="delete-button yes"
                                        onClick={(e) =>
                                            handleSubmit(e, productId)
                                        }
                                    >
                                        <img src={checkIcon} alt="confirm" />
                                    </button>
                                    <button
                                        className="delete-button no"
                                        onClick={() =>
                                            setShowUpdate(!showUpdate)
                                        }
                                    >
                                        <img src={cancelIcon} alt="cancel" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProduct;
