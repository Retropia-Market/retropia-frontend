import es from '../../locale/es.json';
import en from '../../locale/en.json';
import it from '../../locale/it.json';
import gl from '../../locale/gl.json';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
const allMessages = { es, en, gl, it };

const LanguageSwitcher = ({ children }) => {
  const { language } = useSelector((s) => s.language);
  return (
    <IntlProvider
      messages={allMessages[language]}
      locale={language}
      defaultLocale="es"
    >
      {children}
    </IntlProvider>
  );
};

export default LanguageSwitcher;
