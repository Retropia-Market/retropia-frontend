import SelectSearch from 'react-select-search';
import { useIntl } from 'react-intl';

const SelectSaleState = ({ setProductStatus }) => {
    const intl = useIntl();

    const opts = [
        {
            value: 'nuevo',
            name: `${intl.formatMessage({ id: 'status.new' })}`,
        },
        {
            value: 'usado como nuevo',
            name: `${intl.formatMessage({ id: 'status.used' })}`,
        },
        {
            value: 'desgastado',
            name: `${intl.formatMessage({ id: 'status.wornout' })}`,
        },
        {
            value: 'deteriorado',
            name: `${intl.formatMessage({
                id: 'status.deteriorated',
            })}`,
        },
    ];
    return (
        <SelectSearch
            options={opts}
            search
            placeholder="Nombre"
            onChange={setProductStatus}
        />
    );
};

export default SelectSaleState;
