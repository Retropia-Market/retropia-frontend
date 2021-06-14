import es from '../../locale/es.json';
import en from '../../locale/en.json';
import it from '../../locale/en.json';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
const allMessages = { es, en, it };

// const LanguageSwitcher = ({ children }) => {
//     const locale = useSelector((s) => s.language);
//     return (
//         <IntlProvider
//             messages={allMessages[locale]}
//             locale={locale}
//             defaultLocale="es"
//         >
//             {children}
//         </IntlProvider>
//     );
// };

// export default LanguageSwitcher;
