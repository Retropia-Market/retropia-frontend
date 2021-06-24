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
                            <div className="title-container">
                                <h1 className="main-title title-inventory">
                                    <FormattedMessage id="publicprofile.onsale" />
                                    <span className="main-title-row"></span>
                                </h1>
                            </div>
                            <div className="inventory-products">
                                {results &&
                                    results
                                        .filter(
                                            (p) =>
                                                p.sale_status.toLowerCase() ===
                                                'en venta'
                                        )
                                        .map((product) => (
                                            <ProductCard
                                                data={product}
                                                key={product.id}
                                            />
                                        ))}
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
                            <h1 className="main-title title-inventory">
                                <FormattedMessage id="publicprofile.sold" />
                                <span className="main-title-row"></span>
                            </h1>
                            <div className="inventory-products sold">
                                {results &&
                                    results
                                        .filter(
                                            (p) =>
                                                p.sale_status.toLowerCase() ===
                                                'vendido'
                                        )
                                        .map((product, i) => (
                                            <ProductCard
                                                data={product}
                                                key={product.id}
                                            />
                                        ))}
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export default UserPublicInventory;
