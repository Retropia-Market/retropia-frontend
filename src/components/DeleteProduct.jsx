import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import binIcon from '../img/icons/delete.svg';

const DeleteProduct = ({ productId, setHide }) => {
    const user = useSelector((s) => s.user);
    const [showAlert, setShowAlert] = useState();

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
        if (ret.ok) setHide(true);
    };

    return (
        <>
            <div
                onClick={() => setShowAlert(!showAlert)}
                className="delete-icon"
                style={{
                    background: `url(${binIcon}) no-repeat`,
                }}
            >
                D
            </div>
            {showAlert && (
                <div className="update-modal">
                    <div
                        className="modal-bg"
                        onClick={() => setShowAlert(false)}
                    >
                        <div
                            className="modal-fg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="update-title">
                                <FormattedMessage id="delete.title" />
                            </h3>
                            <div className="delete-inputs">
                                <button
                                    className="delete-button-yes"
                                    onClick={() => handleClick(productId)}
                                >
                                    <FormattedMessage id="delete.button.yes" />
                                </button>
                                <button
                                    className="delete-button-no"
                                    onClick={() => setShowAlert(!showAlert)}
                                >
                                    <FormattedMessage id="delete.button.no" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteProduct;
