import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { item } from '../animations';

const LanguageSelector = () => {
    const { language } = useSelector((s) => s.language);
    const dispatch = useDispatch();
    const options = ['es', 'en', 'gl', 'it'];
    let index = 0;

    return (
        <div className="lang">
            <div className={`${language} main`}></div>
            <ul className="dropdown">
                {options
                    .sort((a, b) =>
                        a === language ? -1 : b === language ? 1 : 0
                    )
                    .map((lang) => {
                        return (
                            <li
                                key={lang}
                                onClick={() =>
                                    dispatch({
                                        type: 'UPDATE/LANGUAGE',
                                        language: { language: lang },
                                    })
                                }
                            >
                                <div
                                    className={`${lang} dropdown-menu-${++index}`}
                                ></div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default LanguageSelector;
