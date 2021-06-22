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
                        <div className="catalogue">
                            <h1>
                                <FormattedMessage id="publicprofile.onsale" />
                            </h1>
                            <div className="catalogue-products">
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
                        </div>
                    )}
            </div>
            <div className="inventory">
                {results &&
                    results.some(
                        (p) => p.sale_status.toLowerCase() === 'vendido'
                    ) && (
                        <div className="catalogue">
                            <h1>
                                <FormattedMessage id="publicprofile.sold" />
                            </h1>
                            <div className="catalogue-products sold">
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
                        </div>
                    )}
            </div>
        </div>
    );
};

export default UserPublicInventory;
