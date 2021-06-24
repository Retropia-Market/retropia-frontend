import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import CatSelector from './CatSelector';
import LocationSelector from './LocationSelector';
import NameConsoleSelector from './NameConsoleSelector';
import NameVideoGameSelector from './NameVideoGameSelector';

import { itemNewSale } from '../../animations';
import { motion } from 'framer-motion';
import SelectSaleState from '../SelectSaleState';
import SelectProductType from '../SelectProductType';

import { useIntl } from 'react-intl';

const NewSaleInfo = ({
    files,
    setProductLocation,
    productLocation,
    productType,
    setProductType,
}) => {
    const [productName, setProductName] = useState();
    const [productStatus, setProductStatus] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productDescription, setProductDescription] = useState();

    const [productCategory, setProductCategory] = useState([]);

    const [redirect, setRedirect] = useState(false);

    const user = useSelector((s) => s.user);
    const intl = useIntl();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append(
            'name',
            productType === 'accesory' ? productName : productName[0].name
        );
        fd.append('status', productStatus);
        fd.append(
            'price',
            productPrice.indexOf(',') !== -1
                ? Number(productPrice.replace(/,/, '.'))
                : +productPrice
        );
        fd.append('description', productDescription);
        fd.append(
            'subcategory',
            productType === 'console'
                ? productCategory.toLowerCase()
                : productType === 'videogame'
                ? productCategory[1].toLowerCase()
                : productCategory
        );
        fd.append('product_type', productType);
        fd.append('location', productLocation);
        for (const fil of files) {
            fd.append('images', fil);
        }
        const ret = await fetch('http://localhost:8080/catalogue/sell', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
            body: fd,
        });
        if (ret.ok) {
            setRedirect(true);
        }
    };
    return (
        <motion.div
            className="new-sale-info"
            variants={itemNewSale}
            animate="visible"
            initial="hidden"
            exit="hidden"
        >
            <div className="sale-user-input">
                {redirect && <Redirect to="/" />}
                <span className="new-sale-title product-title">
                    <FormattedMessage id="sale.productdatatitle" />
                </span>
                <form onSubmit={handleSubmit} className="new-sale-form">
                    <div className="info-part info-part-1">
                        <label className="product-type">
                            <span className="product-type-title">
                                <FormattedMessage id="sale.productType" />
                                {productType === 'console'
                                    ? `${intl.formatMessage({
                                          id: 'article.fem',
                                      })}`
                                    : `${intl.formatMessage({
                                          id: 'article.mascul',
                                      })}`}
                            </span>
                            <SelectProductType
                                setProductType={setProductType}
                                productType={productType}
                            />
                        </label>
                        <label className="input-label">
                            <span className="input-title">
                                <FormattedMessage id="sale.productName" />
                            </span>
                            {productType === 'console' ? (
                                <NameConsoleSelector
                                    setProductName={setProductName}
                                    productType={productType}
                                />
                            ) : productType === 'videogame' ? (
                                <NameVideoGameSelector
                                    setProductName={setProductName}
                                    productType={productType}
                                />
                            ) : (
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                    className="normal-input"
                                    placeholder="Escribe el nombre de tu accesorio"
                                />
                            )}
                        </label>
                        <label className="input-label">
                            <span className="input-title">
                                <FormattedMessage id="sale.productPrice" />
                            </span>
                            <input
                                type="text"
                                onChange={(e) =>
                                    setProductPrice(e.target.value)
                                }
                                className="normal-input"
                                pattern="^\d+(,\d{1,2})?$"
                                placeholder="Precio de tu producto"
                            />
                        </label>
                        <label className="input-label">
                            <span className="input-title">
                                <FormattedMessage id="sale.productLoc" />
                            </span>
                            <LocationSelector
                                setProductLocation={setProductLocation}
                            />
                        </label>
                        <label className="input-label">
                            <span className="input-title">
                                <FormattedMessage id="sale.productStatus" />
                            </span>
                            <SelectSaleState
                                setProductStatus={setProductStatus}
                            />
                        </label>
                    </div>
                    <div className="info-part">
                        <label className="input-label">
                            <span className="input-title">
                                <FormattedMessage id="sale.productCat" />
                            </span>
                            <CatSelector
                                setProductCategory={setProductCategory}
                                productName={productName}
                                productType={productType}
                            />
                        </label>
                        <label className="input-label">
                            <span className="input-title">
                                <FormattedMessage id="sale.productDescrip" />
                            </span>
                            <textarea
                                className="textarea-input"
                                cols="30"
                                rows="8"
                                res
                                onChange={(e) =>
                                    setProductDescription(e.target.value)
                                }
                            ></textarea>
                        </label>
                        <button className="yellow-button">
                            <span>
                                <FormattedMessage id="sale.createnew" />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default NewSaleInfo;
