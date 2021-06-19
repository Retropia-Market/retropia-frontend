import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { languageDropdownAni } from '../animations';

const LanguageSelector = () => {
    const { language } = useSelector((s) => s.language);
    const dispatch = useDispatch();
    const options = ['en', 'es', 'it'];

    return (
        <div className="lang">
            <div className={language}></div>
            <motion.ul
                variants={languageDropdownAni}
                animate="visible"
                initial="hidden"
                exit="hidden"
                className="dropdown"
            >
                {options
                    .sort((a, b) =>
                        a === language ? -1 : b === language ? 1 : 0
                    )
                    .map((lang) => {
                        return (
                            <li
                                onClick={() =>
                                    dispatch({
                                        type: 'UPDATE/LANGUAGE',
                                        language: { language: lang },
                                    })
                                }
                            >
                                <div className={lang}></div>
                            </li>
                        );
                    })}
            </motion.ul>
        </div>
    );
};

export default LanguageSelector;
