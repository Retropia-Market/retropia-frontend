import { FormattedMessage } from 'react-intl';

const ProductCardStatus = ({ status }) => {
    const startStatus = status.toLowerCase();
    return (
        <>
            <span
                className={`${
                    startStatus === 'nuevo'
                        ? 'nuevo-state'
                        : startStatus === 'desgastado'
                        ? 'desgastado-state'
                        : startStatus === 'deteriorado'
                        ? 'deteriorado-state'
                        : 'comonuevo-state'
                } product-card-info-status`}
            >
                {startStatus === 'nuevo' ? (
                    <FormattedMessage id="status.new" />
                ) : startStatus === 'desgastado' ? (
                    <FormattedMessage id="status.wornout" />
                ) : startStatus === 'deteriorado' ? (
                    <FormattedMessage id="status.deteriorated" />
                ) : (
                    <FormattedMessage id="status.used" />
                )}
            </span>
        </>
    );
};

export default ProductCardStatus;
