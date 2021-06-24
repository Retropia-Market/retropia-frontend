import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewSaleImageSelect from './NewSaleImageSelect';
import NewSaleInfo from './NewSaleInfo';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { item } from '../../animations';

const NewSale = () => {
    const [files, setFiles] = useState([]);
    const [productLocation, setProductLocation] = useState();
    const [productType, setProductType] = useState();

    const [imageAdded, setImageAdded] = useState(false);
    const isLoggedIn = useSelector((s) => !!s.user);

    if (!isLoggedIn) return <Redirect to="/" />;
    return (
        <div className="outside-box">
            <motion.div
                className="new-sale"
                variants={item}
                animate="visible"
                initial="hidden"
                exit="hidden"
            >
                <h1 className="new-sale-title main-title">
                    {' '}
                    <FormattedMessage id="sale.maintitle" />
                </h1>
                <div className="new-sale-main">
                    <div className="new-sale-first-step">
                        <NewSaleImageSelect
                            imageAdded={imageAdded}
                            setImageAdded={setImageAdded}
                            setFiles={setFiles}
                            files={files}
                            setProductType={setProductType}
                        />
                    </div>

                    {imageAdded && (
                        <NewSaleInfo
                            files={files}
                            setProductLocation={setProductLocation}
                            productLocation={productLocation}
                            productType={productType}
                            setProductType={setProductType}
                        />
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default NewSale;
