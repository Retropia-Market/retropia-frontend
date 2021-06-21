import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { FormattedMessage } from 'react-intl';

const UserPublicInventory = ({ uid }) => {
    const apiURL = `http://localhost:8080/users/${uid}/catalogue`;

    const [results] = useFetch(apiURL);

    return (
        <div className="user-public-inventory">
            <div className="inventory">
                {results &&
                    results.some(
                        (p) => p.sale_status.toLowerCase() === 'en venta'
                    ) && (
                        <>
                            <h1>
                                <FormattedMessage id="publicprofile.onsale" />
                            </h1>
                            <div className="inventory-products">
                                {results &&
                                    results.map((product) => {
                                        if (
                                            product.sale_status.toLowerCase() ===
                                            'en venta'
                                        ) {
                                            return (
                                                <ProductCard
                                                    data={product}
                                                    key={product.id}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                            </div>
                        </>
                    )}
            </div>
            <div className="inventory">
                {results &&
                    results.some(
                        (p) => p.sale_status.toLowerCase() === 'vendido'
                    ) && (
                        <>
                            <h1>
                                <FormattedMessage id="publicprofile.sold" />
                            </h1>
                            <div className="inventory-products sold">
                                {results &&
                                    results.map((product, i) => {
                                        if (
                                            product.sale_status.toLowerCase() ===
                                            'vendido'
                                        ) {
                                            return (
                                                <ProductCard
                                                    data={product}
                                                    key={product.id}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export default UserPublicInventory;
