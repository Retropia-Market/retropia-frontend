import SelectSearch from 'react-select-search';
import { useIntl } from 'react-intl';

const SelectProductType = ({ setProductType, productType }) => {
    const intl = useIntl();

    const opts = [
        {
            value: 'console',
            name: `${intl.formatMessage({
                id: 'type.console',
            })}`,
        },
        {
            value: 'videogame',
            name: `${intl.formatMessage({
                id: 'type.videogame',
            })}`,
        },
        {
            value: 'accesory',
            name: `${intl.formatMessage({
                id: 'type.accesory',
            })}`,
        },
    ];
    return (
        <SelectSearch
            options={opts}
            search
            placeholder="Tipo de producto"
            onChange={setProductType}
            value={productType}
        />
    );
};

export default SelectProductType;
